/** @format */
import Chart from "@/components/echarts";
import { useMemo, useContext } from "react";
import FilscanState from "@/store/content";
import { useTranslation } from "react-i18next";
import { getColor, defaultOpt } from "@/contants/varible";
import styles from "./index.module.scss";

function Overview({ data,list }: { data: any ,list:Array<any>}) {
  const filscanStore: any = useContext(FilscanState);
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "static" });
  };
  const color = useMemo(() => {
    return getColor(filscanStore.filscan.theme);
  }, [filscanStore.filscan.theme]);

  const defaultOtions: any = useMemo(() => {
    return {
        tooltip: {
          show:false,
      },
      legend: {
          orient: 'vertical',
         top: "15%",
         right: "20%",
        textStyle: {
          fontSize: 12,
          color: color.textStyle,
        },
      },
      series: [
        {
          type: "pie",
              radius: '50%',
          label: {
            show: true,
            color:color.textStyle,
              formatter(param: any) {
                  const { percentage,name_show } = param.data;
                  if (percentage) { 
                      return name_show +' (' +percentage+  ')';
                  }
          return param.name + ':'+' (' + param.value + '%)';
        }
      },
        data: [],
         center: ["25%", "50%"],
        },
      ],
    };
  }, [filscanStore.filscan]);

  const options = useMemo(() => {
    const seriesData: any = [];
    const legendData: any = [];
    list.forEach((item: any) => {
      const value = item.value || "--";
      const name = `${tr(item.key)}: (${value} FIL)`;
      legendData.push(name);
        seriesData.push({
        ...item,
            value,
            name,
          name_show:`${tr(item.key)}`,
          itemStyle: {
              color:item.color
          }
      });
    });
    const newOpt = { ...defaultOtions };
    newOpt.series[0].data = seriesData;
      newOpt.legend.data = legendData;
      return { ...newOpt };
      
  }, [data, filscanStore.filscan]);
    
    return <Chart  className={styles.fil_chart_pie}  propsOption={{ ...options }} />
    
}
export default Overview;
