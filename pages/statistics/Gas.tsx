/** @format */
import { useEffect, useState, useMemo } from "react";
import { postAxios } from "@/store/server";
import { RightOutlined } from "@ant-design/icons";
import { apiUrl } from "@/contants/apiUrl";
import { getColor, defaultOpt } from "@/contants/varible";
import { unitConversion, formatDateTime } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { statistics } from "@/contants/statistic";
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
  const { headerData, type } = props;
  const showData = statistics[type];
  const { title } = headerData || showData;
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "static" });
  };

  const [options, setOptions] = useState<any>(defaultOpt("line"));

  useEffect(() => {
    const dateList: Array<string> = [];
    const legendList: any = [];
    const seriesObj: any = {
      total_power: [],
      base_line_power: [],
      total_increase_power: [],
    };
    const newOpt = { ...options };
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
            barMaxWidth: "30",
          });
        }
      );
      newOpt.legend.data = legendList;
      setOptions({ ...newOpt });
    });
  }, []);
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
