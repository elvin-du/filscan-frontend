/** @format */
import { useEffect, useState, useMemo, useContext } from "react";
import { postAxios } from "@/store/server";
import { RightOutlined } from "@ant-design/icons";
import { apiUrl } from "@/contants/apiUrl";
import { getColor, defaultOpt } from "@/contants/varible";
import { unitConversion } from "@/utils/utils";
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

function Trend(props: Props) {
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

  const defaultOptions = useMemo(() => {
    return {
      ...defaultOpt("line", filscanStore.filscan.theme),
      yAxis: [
        {
          type: "value",
          position: "left",
          nameTextStyle: {
            color: color.textStyle,
          },
          axisLabel: {
            formatter: "{value} PiB",
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
          nameTextStyle: {
            color: color.textStyle,
          },
          axisLabel: {
            formatter: "{value} EiB",
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
      ],
      tooltip: {
        trigger: "axis",
        formatter(v: any) {
          var result = v[0].name;
          var options = ["EiB", "EiB", "PiB"];
          v.forEach((item: any) => {
            if (item.data) {
              result +=
                "<br/>" +
                item.marker +
                item.seriesName +
                ": " +
                item.data +
                options[item.componentIndex];
            }
          });
          return result;
        },
      },
    };
  }, [filscanStore.filscan.theme]);

  const [options, setOptions] = useState<any>({});

  useEffect(() => {
    const dateList: Array<string> = [];
    const legendList: any = [];
    const seriesObj: any = {
      total_power: [],
      base_line_power: [],
      total_increase_power: [],
    };
    const newOpt = { ...defaultOptions };
    postAxios(apiUrl.line_trend).then((res: any) => {
      res?.result?.base_line_trend_list?.forEach((value: any) => {
        const { date, base_line_power, total_increase_power, total_power } =
          value;
        dateList.push(date.split("-")[1] + "." + date.split("-")[2]);
        seriesObj.total_increase_power.push(
          unitConversion(total_increase_power, 2, 5).split(" ")[0]
        );
        seriesObj.base_line_power.push(
          unitConversion(base_line_power, 2).split(" ")[0]
        );
        seriesObj.total_power.push(
          unitConversion(total_power, 2, 6).split(" ")[0]
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
            barMaxWidth: "30",
          });
        }
      );
      newOpt.legend.data = legendList;
      setOptions({ ...newOpt });
    });
  }, [filscanStore.filscan]);
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

export default Trend;
