/** @format */
import { useEffect, useState, useMemo, useContext } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import { getColor, defaultOpt } from "@/contants/varible";
import { unitConversion } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { statistics } from "@/contants/statistic";
import FilscanState from "@/store/content";
import styles from "./index.module.scss";
import Chart from "@/components/echarts";
import { OPT_Value } from "@/types";
import Header from "./Header";

interface Props {
  headerData?: Record<string, any>;
  default?: string;
  type: string;
}

function Trend(props: Props) {
  const filscanStore: any = useContext(FilscanState);
  const { headerData, type  } = props;
  const showData = statistics[type];
  const { title } = headerData || showData;
  const [interval,setInterval] = useState('7d')
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "static" });
  };
  const color = useMemo(() => {
    return getColor(filscanStore.filscan.theme);
  }, [filscanStore.filscan.theme]);

  const defaultOptions = useMemo(() => {
    return {
      ...defaultOpt("line", filscanStore.filscan.theme),
      yAxis: [
        {
          type: "value",
          position: "left",
           scale:true,
          nameTextStyle: {
            color: color.textStyle,
          },
          axisLabel: {
           // formatter: "{value} PiB",
            textStyle: {
              color: color.textStyle,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed",
              color: color.splitLine,
            },
          },
        },
        {
          type: "value",
          position: "right",
           scale:true,
          nameTextStyle: {
            color: color.textStyle,
          },
          axisLabel: {
            //formatter: "{value} EiB",
            textStyle: {
              //  fontSize: this.fontSize,
              color: color.textStyle,
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: color.splitLine,
            },
          },
        },
    //     {
    //   type: 'value',
    //   name: '',
    //   position: 'left',
    //   alignTicks: true,
    //   offset: 80,
    //   axisLine: {
    //     show: true,
    //        },
    //    nameTextStyle: {
    //         color: color.textStyle,
    //       },
    //   axisLabel: {
    //       formatter: "{value} PiB",
    //   }
    // },
      ],
      tooltip: {
        trigger: "axis",
        backgroundColor: color.toolbox,
        borderColor: "transparent",
        textStyle: {
          color: "#ffffff",
        },
        formatter(v: any) {
          var result = v[0].name;
          v.forEach((item: any) => {
            if (item.data) {
              result +=
                "<br/>" +
                item.marker +
                item.seriesName +
                ": " +
                item.data.value +
                item.data.unit
            }
          });
          return result;
        },
      },
    };
  }, [filscanStore.filscan.theme]);

  const [options, setOptions] = useState<any>({});

  const load = (interval:string) => {
    const dateList: Array<string> = [];
    const legendList: any = [];
    const seriesObj: any = {
      total_quality_adj_power: [],
      base_line_power: [],
      total_raw_byte_power: [],
      change_quality_adj_power: [],
    };
    const newOpt: any = { ...defaultOptions };
    postAxios(apiUrl.line_trend, { interval: interval }).then((res: any) => {
      res?.result?.list?.reverse().forEach((value: any) => {
        const {
          timestamp,
          base_line_power,
          total_raw_byte_power,
          total_quality_adj_power,
          change_quality_adj_power,
        } = value;
        //date.split("-")[1] + "." + date.split("-")[2]
        const showTime =
          timestamp.split("-")[1] + "." + timestamp.split("-")[2].split(" ")[0];
        dateList.push(showTime);
        seriesObj.total_raw_byte_power.push(
          {
            value: unitConversion(total_raw_byte_power, 2,5).split(" ")[0],
            unit: unitConversion(total_raw_byte_power, 2,5).split(" ")[1],
          }
        );
        seriesObj.base_line_power.push(
          {
            value: unitConversion(base_line_power, 2).split(" ")[0],
            unit: unitConversion(base_line_power, 2).split(" ")[1]
          }
        );
        seriesObj.total_quality_adj_power.push(
          {
            value: unitConversion(total_quality_adj_power, 2).split(" ")[0],
            unit:unitConversion(total_quality_adj_power, 2).split(" ")[1]
          }
        );
        seriesObj.change_quality_adj_power.push(
          {
            value: unitConversion(change_quality_adj_power, 2).split(" ")[0],
            unit:unitConversion(change_quality_adj_power, 2).split(" ")[1]
          }
        );
      });
      newOpt.xAxis.data = dateList;
      newOpt.series = [];
      showData.list.forEach(
        (item: { label: string; type: any; yIndex: any }) => {
          legendList.push(tr(item.label));
          newOpt.series.push({
            type: item.type,
            data: seriesObj[item.label],
            name: tr(item.label),
            yAxisIndex: item.yIndex,
            symbol: "circle",
            barMaxWidth: "30",
          });
        }
      );
      newOpt.legend.data = legendList;
      setOptions({ ...newOpt });
    });
  };

  useEffect(() => {
    if (headerData) {
      load('1m');
    } else { 
       load(interval);
    }
   
  }, [filscanStore.filscan,headerData]);
  return (
    <div className={`${styles.statis} ${styles.statis_trend} default-card`}>
      <Header
        title={title}
        defaultValue={interval}
        onChange={(item: OPT_Value) => {
          setInterval(item.value)
          load(item.value);
        }}
      />
      <Chart propsOption={{ ...options }} className={styles.statis_chart } />
    </div>
  );
}

export default Trend;
