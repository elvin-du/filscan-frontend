import { apiUrl } from "@/contants/apiUrl";
import { contract_list } from "@/contants/contract";
import { pageLimit } from "@/contants/varible";
import { postAxios } from "@/store/server";
import { useContext, useEffect, useMemo, useState } from "react"
import Card from '@/packages/custom_card';
import Table from '@/packages/newTable'
import { useTranslation } from "react-i18next";
import FilscanState from "@/store/content";

export default () => {
  const { t } = useTranslation();
  const filscanStore: any = useContext(FilscanState);
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "contract" });
    }
    return t(label, { ns: "contract" });
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({});
  const [cur, setCur] = useState(0);

  useEffect(() => {
    load()
  }, [])

  const load = (current?:number) => {
    const index = current || cur
    postAxios(apiUrl.contract_verify_list, {
      index,
      limit:pageLimit
    }).then(
      (res: any) => {
        setLoading(false)
        setData(res?.result || []);
      }
    );

  }

  const columns = useMemo(() => {
    return contract_list.columns.map(v => {
      return {...v, title:tr(v.title)}
    })
  },[filscanStore?.filscan?.lang])

  return <Card title={contract_list.title } ns='contract'>
    <Table
      total_msg="contract_list_total"
      ns='contract'
      dataSource={data?.compiled_file_list || []}
      loading={ loading}
      columns={columns}
      total={data?.total}
      rowKey={(record: any,) => {
        return `${record.actor_id}_${record.actor_address}`
      }}
      onPage={(cur: number) => {
        setCur(cur);
        load( cur);
      }}
    />
  </Card>
}