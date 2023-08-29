import { nfts } from "@/contants/contract";
import { useTranslation } from "react-i18next";
import Table from '@/packages/newTable';
import { useContext, useEffect, useMemo, useState } from "react";
import axios, { postAxios } from "@/store/server";
import { apiUrl, fvmUrl } from "@/contants/apiUrl";
import style from './index.module.scss';
import FilscanState from "@/store/content";
import { pageLimit } from "@/contants/varible";

export default () => {
    const filscanStore: any = useContext(FilscanState);
    const [current, setCurrent] = useState(1);
    const [active, setActive] = useState<any>({})
    const { t } = useTranslation();
    const tr = (label: string, value?: Record<string, any>) => {
        if (value) {
            return t(label, { ...value, ns: "contract" });
        }
        return t(label, { ns: "contract" });
    };

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = fvmUrl + '/active/config.json'
        axios.get(url).then(res => {
            setActive(res?.data || {})
        })
        load()
    }, []);

    const load = (cur?:number) => {
        setLoading(true)
        const showIndex =cur || current
        const index = showIndex - 1;
        postAxios(apiUrl.contract_nfts, {
            index,
            limit:pageLimit
        }).then(
            (res: any) => {
                setLoading(false)
                setData(res?.result?.items || []);
            }
        );
    }

    const columns = useMemo(() => {
        return nfts.columns(active,filscanStore?.filscan?.lang).map(v => {
            return {...v, title:tr(v.title)}
        })
    },[filscanStore?.filscan?.lang,active])

    return <div className={ style.token}>
        <div className={ style.token_header}>{tr(nfts.title)}</div>
        <Table
            className={ style.token_table}
            columns={columns}
            loading={loading}
            dataSource={data}
            rowKey={(record: any) => `${record.provider}_${record.collection}`}
            onPage={(cur: number) => {
                setCurrent(cur);
                load( cur);
            }}

        />
    </div>
}