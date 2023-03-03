/** @format */
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";
import { Home_meta } from "@/types/home_types";
import Image from "next/image";
import Tips from "@/packages/tips";
import { useEffect, useState } from "react";
import Charts from "@/components/echarts";
import { formatFilNum } from "@/utils/utils";
interface TrendProps {
  title?: string;
  record: Home_meta;
  data: Record<string, any>;
}

function Trend(props: TrendProps) {
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "home" });
  };
  const { record, data } = props;
  const [options, setOptions] = useState({});
  const { title, list } = record;
  useEffect(() => {
    // optios
    if (data && data.dateList) {
      const series: Record<string, any> = [];
      const legends: any = [];
      list.forEach((labelItem) => {
        series.push({
          data: data.series[labelItem.label],
          name: tr(labelItem.label),
          type: labelItem.type,
          yAxisIndex: labelItem.yIndex,
        });
        legends.push(tr(labelItem.label));
      });

      const newOptios = {
        legend: {
          data: legends,
        },
        yAxis: [
          {
            type: "value",
            name: "1",
          },
          {
            type: "value",
            name: "2",
            position: "right",
            axisLabel: {
              formatter(v: any) {
                if (v === 0) {
                  return 0;
                }
                let value = Number(formatFilNum(v, true, false).split(" ")[0]);
                // let unit =  vm.formatFilNum(v, true, false).split(" ")[1]
                return Number(value).toFixed(1);
              },
              textStyle: {
                // fontSize: this.fontSize,
                // color: color.textStyle,
              },
            },
          },
        ],
        xAxis: {
          data: data.dateList,
        },

        series: series,
      };
      setOptions(newOptios);
    }
  }, [record, data]);
  return (
    <div className={`${styles.home_trend_content} default-card`}>
      <div className='default-card-title'>
        {title?.icon && (
          <Image src={title?.icon} alt='' width={19} className='image-icon' />
        )}
        <span className='title'> {tr(title.label)}</span>
        {title.tip && <Tips context={tr(title.tip)} />}
        <span className='right-content'>
          {title.rightIcon && (
            <span className='right-item'>{tr(title.rightIcon)}</span>
          )}
        </span>
      </div>
      <Charts propsOption={options} />
    </div>
  );
}

export default Trend;
