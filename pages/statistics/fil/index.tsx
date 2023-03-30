/** @format */
import Chart from "@/components/echarts";
import { useMemo, useContext } from "react";
import FilscanState from "@/store/content";
import { useTranslation } from "react-i18next";
import { getColor, defaultOpt } from "@/contants/varible";
import { fil }from "@/contants/statistic";
import styles from "../../index.module.scss";
import Card from '@/packages/card'

function Overview({ data }: { data: any }) {
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
        trigger: "item",
         backgroundColor: color.toolbox,
         borderColor: "transparent",
        textStyle: {
          color: "#ffffff",
        },
        formatter(v: any) {
          const { name, value } = v;
          return `${v.marker} ${name}: ${value}%`;
        },
        position: "right",
      },
      legend: {
        top: "25%",
          orient: 'vertical',
        bottom: 20,
        padding: 10,
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
        formatter(param:any) {
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
   fil.chart.forEach((item: any) => {
      const value = item.value || "--";
      const name = `${tr(item.key)}`;
      legendData.push(name);
      seriesData.push({
        value,
          name,
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
    
    return <Card title={fil.title} ns={'static'}>
        <div className={styles.fil} >
            <Chart className={styles.fil_chart}  propsOption={{ ...options }} />
            <div className={styles.fil_ul}>
                {fil.content.map((v,index) => { 
                    return <li className={styles.fil_ul_li}>
                        <div className={styles.fil_ul_li_label}>{tr(v.label)}</div>
                         <div className={ styles.fil_ul_li_value}>{index === 0 ? tr(v.value): v.value}</div>
                         <div className={ styles.fil_ul_li_des}>{ tr(v.description)}</div>

                    </li>
                })}
            </div>
        </div>     
    </Card>
    
}
export default Overview;
