import { ft_market, ft_overview, ft_tabs, getContractColumns } from '@/contants/contract';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import styles from './index.module.scss';
import Card from '@/packages/card'
import Main from '@/packages/main';
import Tabs from '@/packages/tabs';
import Table from '@/packages/table';

interface Props { 
    type:string ,
}


export default (props: Props) => { 
        const { t } = useTranslation();
      const tr = (label: string, value?: Record<string, any>) => {
        if (value) {
        return t(label, { ...value, ns: "contract" });
        }
        return t(label, { ns: "contract" });
      };
    
    const { type='ft' } = props;
    const [active, setActive] = useState('transfer');
    const [total, setTotal] = useState(0);
    const [data, setData] = useState([]);
    const [loading,setLoading] = useState(false)
    const [current,setCurrent] = useState(1)
    const overview = useMemo(() => { 
        if (type === 'ft') { 
            return ft_overview
        }
        return ft_overview
    }, [type])
    
    const market = useMemo(() => {
         if (type === 'ft') { 
            return ft_market
         }
         return ft_market
     },[type])

    const tabs = useMemo(() => { 
        return ft_tabs
    }, [type])

    const columns = useMemo(() => { 
        return getContractColumns(type, active)?.map((t:any) => { 
            return {...t,title:tr(t.title)}
        })||[]
       
    },[type,active])



    const handleChange = (item:any) => { 
            setActive(item.value)
    }   


    const load = (active:string,cur?:number) => { 
        console.log('----33----load',)
    }
    

    const renderList = () => { 
        
        switch (active) { 
        case 'domain':
        return <div>
            domin
        </div>
            
        default:
            return <Table
          className='rank_table'
          columns={columns}
          total={type ? 0:total}
          loading={ loading}
          dataSource={data }
          current={current}
          rowKey={(record: any) => `${record.rank}_${active}`}
          onPage={(cur: number) => {
            setCurrent(cur);
            load(active, cur);
          }}
        /> 
        }

    }




    return <div className={styles.contractFt}>
        <div>Header title</div>
        <div className={styles.contractFt_over}>
            <Card title={overview?.title} ns='contract'>
                 <Main ns='contract' content={overview?.content} data={{}}/> 
            </Card>
            <Card title={market?.title }  ns='contract'>
                <Main ns='contract' content={market?.content} data={{}}/>
            </Card> 
        </div>
         <Tabs data={tabs} ns='contract' defaultValue={active} border onChange={handleChange} />
        <div className={ styles.contractFt_list}>
          {renderList()}
        </div>
    </div>
}