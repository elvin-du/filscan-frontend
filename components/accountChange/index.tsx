
import Chart from '@/components/echarts'
import { apiUrl } from '@/contants/apiUrl';
import { defaultOpt, getColor } from '@/contants/varible';
import FilscanState from '@/store/content';
import { postAxios } from '@/store/server';
import { formatFil, formatFilNum } from '@/utils/utils';
import dayjs from 'dayjs';
import { reverse } from 'dns/promises';
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next';

interface Props { 
    address: string | undefined | string[]
  type: string
  interval?:string
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
     yAxis: {
          type: 'value',
          scale: true,
          nameTextStyle: {
            color: color.textStyle,
            align: 'left',
       },
           
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
              return v + ' FIL'
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
        postAxios(apiUrl.account_change, {
            account_id: address, filters: {
            interval: interval,
              account_type:type
        }}).then(
            (res: any) => {
                const seriesObj: any = {
                available_balance: [], //可用余额
                pre_deposits: [], //预存款
                locked_balance: [], //锁仓奖励	
                init_pledge: [],//扇区抵押，
                balance:[]
                  };
                let newOpt:any = { ...defaultOptions }
                newOpt.series = [];
                const timeData:any = [];
            res?.result?.balance_trend_by_account_id_list?.reverse()?.forEach((value: any) => {
              if (value) { 
                 const { block_time, available_balance,balance, precommit_deposits, locked_funds,initial_pledge } = value;
                let showTime: string = "";
                showTime = interval === '24h'?dayjs(block_time*1000).format('HH:mm'): dayjs(block_time*1000).format('YYYY-MM-DD HH:mm');
                timeData.push(showTime)
                const [available_balance_amount, available_balance_unit] = available_balance && formatFilNum(available_balance, false, false, 4, false)?.split(' ');
                const [precommit_deposits_amount,precommit_deposits_unit] = precommit_deposits&& formatFilNum(precommit_deposits, false, false, 4, false)?.split(' ')
                const [locked_funds_amount,locked_funds_unit] = locked_funds&& formatFilNum(locked_funds, false, false, 4, false)?.split(' ')
                const [initial_pledge_amount, initial_pledge_unit] = initial_pledge && formatFilNum(initial_pledge, false, false, 4, false)?.split(' ');
                const [balance_amount,balance_unit] = balance&& formatFilNum(balance, false, false, 4, false)?.split(' ')

                seriesObj.available_balance.push({
                  amount:available_balance_amount,
                  value: formatFil(available_balance, 'FIL', 4),
                  unit:available_balance_unit,
                })
                seriesObj.pre_deposits.push({
                  amount:precommit_deposits_amount,
                  value: formatFil(precommit_deposits, 'FIL', 4),
                  unit:precommit_deposits_unit
                })
                seriesObj.locked_balance.push({
                  amount:locked_funds_amount,
                  value: formatFil(locked_funds, 'FIL', 4),
                  unit:locked_funds_unit
                })
                seriesObj.init_pledge.push({
                    amount:initial_pledge_amount,
                  value: formatFil(initial_pledge, 'FIL', 4),
                  unit:initial_pledge_unit
                })
                seriesObj.balance.push({
                  amount:balance_amount,
                  value: formatFil(balance, 'FIL', 4),
                  unit:balance_unit
             
                })

              }
               
            });          
            const legendList: any = [];
                 list.forEach((item:any) => { 
                  legendList.push(tr(item.label));
                   const dataIndex = item?.dataIndex||item.label
                 newOpt.series.push({
                  type: item.type,
                    smooth: true,
                    data: seriesObj[dataIndex],
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
  }, [address,interval,filscanStore.filscan.theme]);
    return <Chart className={'chart_content'} propsOption={{...options}} />
}


