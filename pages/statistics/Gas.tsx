/** @format */
import { useEffect, useState, useMemo, useContext } from "react";
import { postAxios } from "@/store/server";
import { RightOutlined } from "@ant-design/icons";
import { apiUrl } from "@/contants/apiUrl";
import { getColor, defaultOpt } from "@/contants/varible";
import { formatDateTime, formatFilNum } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { statistics } from "@/contants/statistic";
import FilscanState from "@/store/content";
import styles from "./index.module.scss";
import Tips from "@/packages/tips";
import Chart from "@/components/echarts";
import Image from "next/image";
import Link from "next/link";

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
              if (v === 0) {
                return 0;
              }
              let value = Number(formatFilNum(v, true, false).split(" ")[0]);
              let unit = formatFilNum(v, true, false).split(" ")[1];
              let num = value > 1 ? 1 : 2;
              return Number(value).toFixed(num) + " " + unit;
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
      tooltip: {
        trigger: "axis",
        formatter(v: any) {
          var result = v[0].name;
          let data = v.map((item: any, index: number) => {
            const { data } = item;
            if (index > 0) {
              let unit = "FIL/T";
              let tmp: number | string = Number(data).toFixed(6);
              if (Number(tmp) < 0.0001) {
                unit = "nanoFIL/T";
                tmp = Number(Number(data) * Math.pow(10, 9)).toFixed(2);
              }
              return {
                value: tmp,
                unit: unit,
              };
            } else {
              return {
                unit: "attoFIL",
                value: data,
              };
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
  }, [filscanStore.filscan.theme]);

  const [options, setOptions] = useState<any>([]);

  useEffect(() => {
    const dateList: Array<string> = [];
    const legendList: any = [];
    const seriesObj: any = {
      gas_in_32g: [],
      base_fee: [],
      gas_in_64g: [],
    };
    const newOpt = { ...defaultOtions };
    postAxios(apiUrl.static_gas).then((res: any) => {
      res?.result?.base_fee_trend_list?.reverse().forEach((value: any) => {
        const { block_time, base_fee, gas_in_32g, gas_in_64g } = value;
        dateList.push(formatDateTime(block_time, "HH:mm"));
        seriesObj.gas_in_32g.push(gas_in_32g);
        seriesObj.base_fee.push(base_fee);
        seriesObj.gas_in_64g.push(gas_in_64g);
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
          });
        }
      );
      newOpt.legend.data = legendList;
      setOptions({ ...newOpt });
    });
  }, [filscanStore.filscan]);

  // useEffect(() => {
  //   const newOpt = { ...options };
  //   newOpt.
  // }, [filscanStore.filscan]);

  return (
    <div className={`${styles.statis} ${styles.statis_trend} default-card`}>
      <div className='default-card-title'>
        {title?.icon && (
          <Image src={title?.icon} alt='' width={19} className='image-icon' />
        )}
        <span className={`${styles.statis_trend_title} font_18`}>
          {tr(title.label)}
        </span>
        {title?.tip && <Tips context={tr(title.tip)} />}
        {title.right && title.right.link ? (
          <Link href={title.right.link} className='right-item link_item'>
            {tr(title.right.title)}
            <RightOutlined />
          </Link>
        ) : (
          title.right && (
            <span className='right-item'>{tr(title.right.title)}</span>
          )
        )}
      </div>
      <Chart propsOption={{ ...options }} />
    </div>
  );
}

export default Gas;
