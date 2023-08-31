import { apiUrl } from "@/contants/apiUrl";
import { contract_rank } from "@/contants/contract";
import { pageLimit } from "@/contants/varible";
import { postAxios } from "@/store/server";
import { useContext, useEffect, useMemo, useState } from "react"
import Card from '@/packages/custom_card';
import Table from '@/packages/newTable'
import Tabs from "@/packages/tabs";
import { useTranslation } from "react-i18next";
import style from '../index.module.scss'
import FilscanState from "@/store/content";
import { getSvgIcon } from "@/svgUtils";
import Link from "next/link";
import { formatDateTime } from "@/utils/utils";

export default () => {
  const filscanStore: any = useContext(FilscanState);
  const [sorte, setSorte] = useState<any>({
    order: 'descend',
    field:'transfer_count'
  })
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "contract" });
    }
    return t(label, { ns: "contract" });
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const [cur, setCur] = useState(1);

  useEffect(() => {
    load()
  }, [])

  const load = (current?:number,sort?:any) => {
    const index = current || cur;
    const sortFile = sort || sorte;
    setLoading(true)
    postAxios(apiUrl.contract_rank, {
      page:index-1,
      limit: pageLimit,
      sort:  sortFile.order === 'ascend' ?'asc':'desc' ,
      field:sortFile?.field
    }).then(
      (res: any) => {
        setLoading(false)
        setData(res?.result || []);
      }
    );

  }

  const columns = useMemo(() => {
    return contract_rank.columns.map(v => {
      if (v.dataIndex === 'contract_name') {
        v.render = (text: string,record:any) => {
          if (text) {
            return <span className="table_li_center"style={{maxWidth:200}} >
              <span className="success_color">
                {getSvgIcon('successIcon')}
              </span>
              {/* <Tooltip text='dttatdsfdsgferwerwdddtasdsdffeedsfdfgk4ekrwq;sfdnsafmeqrfll' /> */}

              <Link href={`/address/${record.contract_address}`} >{ text}</Link>

            </span>
          }
          return <Link href='/contract/verify'>{ tr('ver_address')}</Link>
        }
      }
      return {...v, title:tr(v.title)}
    })
  },[filscanStore?.filscan?.lang])

  return <Card ns='contract' header={
    <span className={ style.rank_title}>
      {tr(contract_rank.title)}
      { data.update_time && <span className={ style.rank_title_des}>{tr(contract_rank.title_des,{value:formatDateTime(data.update_time,"YYYY-MM-DD HH:mm")})}</span>}

    </span>}>
    <Table
      ns='contract'
      total_msg={contract_rank.total_msg}
      // total_msg={
      //     <span className={ style.rank_table_des}>
      //         <span>{tr(contract_rank.total_msg, {value:data?.total})}</span>
      //     </span>
      //    }
      dataSource={data?.evm_contract_list || []}
      loading={ loading}
      columns={columns}
      current={cur}
      total={data?.total}
      onChange={(pagination: any, filters: any, sorter: any,) => {
        const index = pagination?.current || cur;
        let obj;
        if (pagination.current) {
          setCur(pagination.current);
        }
        if (sorter.field ) {
          obj = {
            field: sorter.field,
            order:sorter.order
          }
          setSorte(obj)

        }
        load(index,obj)

      }}
      rowKey={(record: any,) => {
        return `${record.actor_id}_${record.actor_address}`
      }}
      //  onPage={(cur: number) => {
      //     setCur(cur);
      //    // load( cur);
      // }}
    />
  </Card>
}