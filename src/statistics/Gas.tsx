/** @format */
import { useEffect, useState, useMemo, useContext } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import { getColor, defaultOpt } from "@/contants/varible";
import { formatFilNum,formatFil } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { statistics } from "@/contants/statistic";
import FilscanState from "@/store/content";
import styles from "./index.module.scss";
import Chart from "@/components/echarts";
import { OPT_Value } from "@/types";
import Header from "./Header";
import Gas_24 from "./Gas_24";

interface Props {
  headerData?: Record<string, any>;
  type: string;
}

function Gas(props: Props) {
  const filscanStore: any = useContext(FilscanState);
  const { headerData, type } = props;
  const showData = statistics[type];
  const { title } = headerData || showData;

  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "static" });
  };
    const [interval,setInterval] = useState('7d')
  const color = useMemo(() => {
    return getColor(filscanStore.filscan.theme);
  }, [filscanStore.filscan.theme]);

  const defaultOtions: any = useMemo(() => {
    return {
      yAxis: [
        {
          type: "value",
          scale:true,
          axisLabel: {
            formatter(v: any) {
              
              return v + " autoFIL/T";
            },
            textStyle: {
              color: color.textStyle,
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: color.lineStyle,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: color.splitLine,
            },
          },
        },
        {
          type: "value",
           scale:true,
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter(v: any) {
              return v + " nanoFiL/T";
            },
            textStyle: {
              //  fontSize: this.fontSize,
              color: color.textStyle,
            },
          },
          nameTextStyle: {
            color: "#ffffff",
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: color.lineStyle,
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: "dashed",
              color: color.splitLine,
            },
          },
        },
      ],
      series:    {
            type: 'line',
            smooth: true,
            itemStyle: {
              color: '#00E5FF'
            },
            yAxisIndex: 0,
            markArea: {
              itemStyle: {
                color: '#153550'
              }
            }
          },
      tooltip: {
        trigger: "axis",
        backgroundColor: color.toolbox,
        borderColor: "transparent",
        textStyle: {
          color: "#ffffff",
        },
        formatter(v: any) {
          var result = v[0].name;
          v.forEach((item: any, index: number) => {
            if (item.data) {
              result +=
                "<br/>" +
                item.marker +
                item.seriesName +
                ": " +
                item.data.value +
                " " +
                item.data.unit;
            }
          });
          return result;
        },
      },
      ...defaultOpt("line", filscanStore.filscan.theme),
    };
  }, [filscanStore.filscan]);

  const [options, setOptions] = useState<any>([]);

  const load = (value: string = "24h") => {
    const dateList: Array<string> = [];
    const legendList: any = [];
    const seriesObj: any = {
      gas_in_32g: [],
      base_fee: [],
      gas_in_64g: [],
    };
    const newOpt = { ...defaultOtions };
    postAxios(apiUrl.static_gas, { interval: value }).then((res: any) => {
      res?.result?.list?.reverse().forEach((dataItem: any) => {
        const { timestamp, base_fee, gas_in_32g, gas_in_64g } = dataItem;
        let showTime: string = "";
        if (value === "24h") {
          const newTime = timestamp.split(" ")[1];
          showTime = newTime.split(":")[0] + ":" + newTime.split(":")[1];
        } else {
          showTime = timestamp.split("+")[0];
        }

        dateList.push(showTime);
        seriesObj.gas_in_32g.push({
          value: formatFil(gas_in_32g,'nanoFiL'),
          unit:'nanoFiL'
        });
        seriesObj.base_fee.push({
          value: formatFil(base_fee,'attoFIL'),
          unit:'attoFIL'
        });
        seriesObj.gas_in_64g.push({
          value: formatFil(gas_in_64g,'nanoFiL'),
          unit:'nanoFiL'
        });
      });
      newOpt.xAxis.data = dateList;
      newOpt.series = [];
      showData.list.forEach(
        (item:any) => {
          legendList.push(tr(item.label));
          newOpt.series.push({
            type: item.type,
            data: seriesObj[item.label],
            name: tr(item.label),
            yAxisIndex: item.yIndex,
            symbol: "circle",
            unit:item.unit
          });
        }
      );
      newOpt.legend.data = legendList;
      setOptions({ ...newOpt });
    });
  };

  useEffect(() => {
    load(interval);
  }, [filscanStore.filscan]);

  return (
    <>
      <div className={`${styles.statis} ${styles.statis_trend} default-card`}>
        <Header
          title={title}
          defaultValue='24h'
          onChange={(item: OPT_Value) => {
            setInterval(item.value)
            load(item.value);
          }}
        />
        <Chart propsOption={{ ...options }}  className={styles.statis_chart }  />
      </div>
      {!headerData && <Gas_24  />}
    </>
  );
}

export default Gas;
