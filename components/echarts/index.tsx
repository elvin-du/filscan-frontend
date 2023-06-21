/** @format */

import * as echarts from "echarts";
// import {
//   // 系列类型的定义后缀都为 SeriesOption
//   LineChart,
// } from "echarts/charts";
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";

// 注册必须的组件
// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   DatasetComponent,
//   TransformComponent,
//   LabelLayout,
//   UniversalTransition,
//   CanvasRenderer,
//   LineChart,
// ]);

type EChartsOption = echarts.EChartsOption;
import { colors } from "@/contants/varible";
import { useMemo, useContext } from "react";
import { getColor } from "@/contants/varible";
import FilscanState from "@/store/content";
import style from './style.module.scss'
interface Props {
  propsOption: EChartsOption | Record<string, any>;
  className?:string
}

export default (props: Props) => {
  // 1. get DOM
  const chartRef = useRef(null);
  const { propsOption,className } = props;
  const filscanStore: any = useContext(FilscanState);

  const color = useMemo(() => {
    return getColor(filscanStore.filscan.theme);
  }, [filscanStore.filscan.theme]);

  useEffect(() => {
    // 2. 实例化表格对象

    const chart = echarts.init(chartRef.current as unknown as HTMLDivElement);
    // 3. 定义数据
    const option = {
      backgroundColor: "transparent",
      color: colors,
      tooltip: {},
      grid: {
        top: 50,
        left: 20,
        right: 20,
        bottom: 0,
        containLabel: true,
      },
    };
    // 4. 调用表格数据
    chart.setOption({ ...option, ...propsOption });

      const handleSize = () => {
      chart.resize()
    };
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [propsOption]);



  return <div className={`${style.chart} ${className}`}    ref={chartRef} />;
};
