
import Chart from '@/components/echarts'
import { apiUrl } from '@/contants/apiUrl';
import { defaultOpt, getColor } from '@/contants/varible';
import FilscanState from '@/store/content';
import { postAxios } from '@/store/server';
import { formatFil, unitConversion } from '@/utils/utils';
import dayjs from 'dayjs';
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';

interface Props { 
    address: string | undefined | string[]
    type: string
    interval: string;
    list: Array<{label:string,type:string}>
}

export default (props: Props) => {
    const filscanStore: any = useContext(FilscanState);
    const { address,type,list,interval } = props;
    const color = useMemo(() => {
            return getColor(filscanStore.filscan.theme);
    }, [filscanStore.filscan.theme]);

     const defaultOptions = useMemo(() => {
    return {
      ...defaultOpt("line", filscanStore.filscan.theme),
      yAxis: [
        {
       type: 'value',
        scale:true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
       },
          axisLabel: {
            show: true,
             lineStyle: {
              color: color.lineStyle,
            },
             textStyle: {
              color: color.textStyle,
            },
              formatter(v: string) {
              return v + ' TiB'
            },
          },
          splitLine: {
             lineStyle: {
              type: "dashed",
              color: color.splitLine,
            },
          },
          // name: vm.tr("chart.title"),
          nameTextStyle: {
            color: color.textStyle,
            align: 'left',
          },
          //nameGap: 22 * rate
        },
     ],
      tooltip: {
          trigger: 'axis',
          position: 'right',
        backgroundColor: color.toolbox,
        borderColor: "transparent",
        textStyle: {
          color: "#ffffff",
        },
          formatter(p:Array<any>) {
                let result = p[0].name;
            p.forEach((item: any, index: number) => {
                    if (item.data) {
                            result +=
                                "<br/>" +
                                item.marker +
                                item.seriesName +
                                ": " +
                                item.data.amount +
                                " " +
                                item.data.unit 
                    }
          });
          return result;
              
          },
        }, 
     
    };
     }, [filscanStore.filscan.theme]);
    
     const { t } = useTranslation();
        const tr = (label: string): string => {
            return t(label, { ns: "detail" });
        };
    const [options, setOptions] = useState({})

  useEffect(() => {
      if (address) {
        postAxios(apiUrl.account_trend, {
            account_id: address, filters: {
                interval: interval,
                account_type:type
        }}).then(
            (res: any) => {
                  const seriesObj: any = {
                    power: [], //有效算力
                    power_increase: [], //算力增长
                  };
                let newOpt:any = { ...defaultOptions }
                newOpt.series = [];
                const timeData:any = [];
                res?.result?.power_trend_by_account_id_list?.reverse().forEach((value: any) => {
                const { block_time, power, power_increase,} = value;
                let showTime: string = "";
                showTime = dayjs(block_time*1000).format('YYYY-MM-DD HH:mm');
                  timeData.push(showTime)
                  //y轴
                  const [powerValue, powerUnit] = unitConversion(power,4,4).split(" ");
                  const [increaseValue, increaseUnit] = unitConversion(power_increase, 4, 4)?.split(" ");

                  //amount
                  const [powerValue_amount, powerValue_unit] = unitConversion(power, 4)?.split(" ");
                  const [power_increase_amount, power_increase_unit] = unitConversion(power_increase, 4)?.split(" ");
                  seriesObj.power.push({
                    value: powerValue,
                    unit: powerValue_unit,
                    amount: powerValue_amount
                  })
                  seriesObj.power_increase.push({
                    value: increaseValue,
                    unit: power_increase_unit,
                    amount: power_increase_amount
                  })

            });
          
                const legendList:any = [];
                 list.forEach((item:any) => { 
                legendList.push(tr(item.label));
                newOpt.series.push({
                  type: item.type,
                    smooth: true,
                    data: seriesObj[item.label],
                    name: tr(item.label),
                    symbol: "circle",
                  barMaxWidth: "30",
                    backgroundStyle: {
                        color:item?.backgroundColor||''
                    }
                });
                 })
                newOpt.legend.data = legendList;
            newOpt.xAxis.data = timeData;
                setOptions(newOpt);
        }
      );
    }
  }, [address,interval,filscanStore.filscan.theme]);
    return <Chart className={'chart_content'} propsOption={{...options}} />
}


