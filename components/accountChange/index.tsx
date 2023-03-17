
import Chart from '@/components/echarts'
import { apiUrl } from '@/contants/apiUrl';
import { defaultOpt, getColor } from '@/contants/varible';
import FilscanState from '@/store/content';
import { postAxios } from '@/store/server';
import { formatFil } from '@/utils/utils';
import dayjs from 'dayjs';
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';
import styles from './style.module.scss'

interface Props { 
    address: string | undefined | string[]
    type: string
    list: Array<{label:string,type:string}>
}

export default (props: Props) => {
    const filscanStore: any = useContext(FilscanState);
    const { address,type,list } = props;
    const color = useMemo(() => {
            return getColor(filscanStore.filscan.theme);
    }, [filscanStore.filscan.theme]);

     const defaultOptions = useMemo(() => {
    return {
      ...defaultOpt("line", filscanStore.filscan.theme),
     yAxis: {
          type: 'value',
          min: 0,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            color,
            formatter(v:string) {
              return v + ' FIL'
            },
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          // name: vm.tr("chart.title"),
          nameTextStyle: {
            color,
            align: 'left',
          },
          //nameGap: 22 * rate
        },
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
                                item.data +
                                " " +
                               'FIL'
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
        postAxios(apiUrl.account_change, {
            account_id: address, filters: {
                interval: '30d',
                account_type:type
        }}).then(
            (res: any) => {
                  const seriesObj: any = {
                available_balance: [], //可用余额
                pre_deposits: [], //预存款
                locked_balance: [], //锁仓奖励	
                init_pledge:[],//扇区抵押
                  };
                let newOpt:any = { ...defaultOptions }
                newOpt.series = [];
                const timeData:any = [];
                res?.result?.balance_trend_by_account_id_list?.forEach((value: any) => {
                const { block_time, available_balance, precommit_deposits, locked_funds,initial_pledge } = value;
                let showTime: string = "";
                showTime = dayjs(block_time*1000).format('YYYY-MM-DD HH:mm');
                timeData.push(showTime)
                seriesObj.available_balance.push(formatFil(available_balance))
                seriesObj.pre_deposits.push(formatFil(precommit_deposits))
                seriesObj.locked_balance.push(formatFil(locked_funds))
                seriesObj.init_pledge.push(formatFil(initial_pledge))

            });
          
                const legendList:any = [];
                 list.forEach(item => { 
                legendList.push(tr(item.label));
                newOpt.series.push({
                    type: item.type,
                    data: seriesObj[item.label],
                    name: tr(item.label),
                    symbol: "circle",
                    barMaxWidth: "30",
                });
                 })
                newOpt.legend.data = legendList;
                newOpt.xAxis.data = timeData;
                setOptions(newOpt);
        }
      );
    }
  }, [address]);
    return <Chart className={styles.chart_content} propsOption={{...options}} />
}


