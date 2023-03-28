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
  const color = useMemo(() => {
    return getColor(filscanStore.filscan.theme);
  }, [filscanStore.filscan.theme]);

  const defaultOtions: any = useMemo(() => {
    return {
      yAxis: [
        {
          type: "value",
          min: 0,
          axisLabel: {
             formatter(v: any) {
              return v + " FIL/T";
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
          min: 0,
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter(v: any) {
              return v + " FIL/T";
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
          let data = v.map((item: any, index: number) => {
            const { data } = item;
           // if (index > 0) {
            //   let unit = "FIL/T";
            //   let tmp: number | string = Number(data).toFixed(6);
            //   if (Number(tmp) < 0.0001) {
            //     unit = "nanoFIL/T";
            //     tmp = Number(Number(data) * Math.pow(10, 9)).toFixed(2);
            //   }
            //   return {
            //     value: tmp,
            //     unit: unit,
            //   };
            // } else {
            //   return {
            //     unit: "attoFIL",
            //     value: data,
            //   };
            // }
            return {
              unit:'FIL/T',
              value:data
            }
          });
          v.forEach((item: any, index: number) => {
            if (item.data) {
              result +=
                "<br/>" +
                item.marker +
                item.seriesName +
                ": " +
                data[index].value +
                " " +
                data[index].unit;
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
        seriesObj.gas_in_32g.push(formatFil(gas_in_32g,'FIL'));
        seriesObj.base_fee.push(formatFil(base_fee,'FIL'));
        seriesObj.gas_in_64g.push(formatFil(gas_in_64g,'FIL'));
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
          });
        }
      );
      newOpt.legend.data = legendList;
      setOptions({ ...newOpt });
    });
  };

  useEffect(() => {
    load();
  }, [filscanStore.filscan]);

  return (
    <>
      <div className={`${styles.statis} ${styles.statis_trend} default-card`}>
        <Header
          title={title}
          defaultValue='24h'
          onChange={(item: OPT_Value) => {
            load(item.value);
          }}
        />
        <Chart propsOption={{ ...options }} />
      </div>
      {!headerData && <Gas_24 />}
    </>
  );
}

export default Gas;
