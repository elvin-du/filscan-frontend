import { formatNumber } from "@/utils/utils"
import Image from '@/packages/image'
import { pageLimit } from "./varible"
export const defi_dashboard = [
    {
        title: 'fevm_staked',
        dataIndex: 'fevm_staked',
        render: (text:string,record:any) => { 
            return '$' + formatNumber(text,2)
        }
    },
     {
        title: 'staked_change_in_24h',
         dataIndex: 'staked_change_in_24h',
          render: (text:string,record:any) => { 
              return <span className={Number(text) > 0 ? 'ups-color' : 'down-color'}>
                  { `$${formatNumber(text,2)}`}
            </span>
        }
    },
      {
        title: 'total_user',
          dataIndex: 'total_user',
          render: (text:string,record:any) => { 
            return  formatNumber(text,2)
        }
    },
       {
        title: 'user_change_in_24h',
           dataIndex: 'user_change_in_24h',
          render: (text:string,record:any) => { 
              return <span className={ Number(text) > 0 ? 'ups-color':'down-color'}>
                  {formatNumber(text,2)}
            </span>
        }
    },
        {
        title: 'fil_staked',
            dataIndex: 'fil_staked',
         render: (text:string,record:any) => { 
            return  formatNumber(text,2) + ' FIL'
        }
    }
]

export const defi_list = {
    title: 'defi_list',
    total_msg:'defi_list_total',
    columns(page:number) { 
        return [
            {
            dataIndex: '',
                title: 'rank',
            width:'5%',
                render: (text: string, record: any, index:number) => {
                    if (page === 1) {
                        return index + 1;
                    } else { 
                        return (page - 1)* pageLimit + index 
                    }
                
            }
        }, 
         {
            dataIndex: 'protocol',
             title: 'Protocol',
             width:'25%',

            render: (text:string,record:any) => { 
                return <div className="flex_align_center">
                    <Image src={record.icon_url} width={35} height={35} style={{borderRadius:'50%'}} alt='logo' />
                    <span className="margin-10">{text}</span>
                </div>
            }
        },
          {
            dataIndex: 'tvl',
              title: 'tvl',
              width:'15%',
              defaultSortOrder: 'descend',
              sorter:true,
              render: (text: string, record: any) => { 
                 // const left = (Number(text) / Number(max_pro)) * 100 + "%";
              //  console.log('-max_pro---3',max_pro,record,text,left)
            return '$' + formatNumber(text ,2)
            // return <span className="other_progress">
            //   <span className="progress">
            //      <span className="mask" style={{left}}></span>
            //     </span>
            //     <span>{ text}</span>
            //     </span>
               // return text
              }
        },
        {
            dataIndex: 'tvl_change_rate_in_24h',
            title: 'tvl_change_rate_in_24h',
            sorter: true,
            width:'20%',
            render: (text: string) => <span className={Number(text) > 0 ? 'ups-color' : 'down-color'}>
                {Number(text).toFixed(2)+'%' }
            </span>

        },
        {
            dataIndex: 'tvl_change_in_24h',
            title: 'tvl_change_in_24h',
            sorter: true,
            width:'15%',
              render: (text: string) => <span className={Number(text) > 0 ? 'ups-color' : 'down-color'}>
                {formatNumber(text,2) }
            </span>
        },
          {
            dataIndex: 'users',
              title: 'users',
            width:'10%',
            sorter:true,
            },
            {
            dataIndex: 'tokens',
                title: 'tokens',
            width:'10%',
                render: (text: any) => { 
                    if (Array.isArray(text)) { 
                        return <div >{ text.map(item_t => { 
                                return <li className="flex_align_center">
                                    <Image src={item_t.icon_url} width={20} height={ 20} alt='' />
                                    <span className="margin-6">{item_t.rate}%</span>
                            </li>
                        })}
                      </div>
                    }
                    return '--'
                }
        },
    ]

    } 
}