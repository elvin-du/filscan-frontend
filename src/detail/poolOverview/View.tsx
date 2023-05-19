/** @format */
import Chart from "@/components/echarts";
import { useMemo, useContext } from "react";
import FilscanState from "@/store/content";
import { formatFil, getShowData } from "@/utils/utils";
import { useTranslation } from "react-i18next";
import { getColor, defaultOpt } from "@/contants/varible";
import {  pool_overview } from "@/contants/detail";

function Overview({ data }: { data: any }) {
  const filscanStore: any = useContext(FilscanState);
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "detail" });
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
          return `${v.marker} ${name}`;
        },
        position: "right",
      },
      legend: {
        top: "40%",
        orient: "",
        width: 400,
        right: "10%",
        textStyle: {
          fontSize: 16,
          color: color.textStyle,
        },
      },
      series: [
        {
          type: "pie",
          radius: ["26%", "48%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            fontSize: 16,
            rich: {
              dark: {
                color: "#000",
              },
              color: {
                color: "#309cfe",
              },
            },
          },
          data: [],
          center: ["20%", "55%"],
        },
      ],
    };
  }, [filscanStore.filscan]);

  const options = useMemo(() => {
    const seriesData: any = [];
    const legendData: any = [];
     legendData.push('test 111');
      pool_overview.list.content.forEach((item: any) => {
      const showData = getShowData(item, data);
      const value = showData && showData[item.dataIndex] ? formatFil(showData[item.dataIndex]): "--";
      const name = `${tr(item.label)}: ${value !== '--' ? formatFil(value ,'FIL',3):'--'} FIL`;
        legendData.push(name);
           legendData.push('123');
      seriesData.push({
        value,
        name,
      });
    });
    const newOpt = { ...defaultOtions };
    newOpt.series[0].data = seriesData;
    newOpt.legend.data = legendData;
    return { ...newOpt };
    
    
  }, [data, filscanStore.filscan]);

  return <Chart propsOption={{ ...options }} />;
}
export default Overview;
