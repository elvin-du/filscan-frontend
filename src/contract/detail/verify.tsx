import { apiUrl } from "@/contants/apiUrl"
import { postAxios } from "@/store/server"
import { useEffect, useState } from "react"
import Card from '@/packages/custom_card'
import Main from '@/packages/main'
import { contract_detail } from "@/contants/contract"
import style from './index.module.scss'
import { useTranslation } from "react-i18next"
import { getSvgIcon } from "@/svgUtils"
import Copy from '@/components/copy'
import { Select } from "antd"
import dynamic from "next/dynamic"
import Link from "next/link"

const Editor = dynamic(() => import('@/components/ace'), { ssr: false });

export default ({ id ,verifyData}: { id?: string | string[] ,verifyData?:Record<string,any> }) => {
  const { t } = useTranslation();
  const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "contract" });
    }
    return t(label, { ns: "contract" });
  };
  const [data, setData] = useState<any>({})

  useEffect(() => {
    setData(verifyData)
  }, [verifyData])

  const handleClick = (value: any) => {
    if (id) {
      window.open(`${window.location.origin}/contract/abi/${id}?format=${value}`)
    }

  }

  return <div >
    {data?.source_file && Object.keys(data?.source_file).length > 0 && <>
      <Card title={contract_detail.overview.title} ns='contract' className={style.contract_wrap_card}>
        <Main content={contract_detail.overview.list} data={data} ns='contract' splitFlex={true}
          splitClassName={style.contract_wrap_overview }
          warpClassName={style.contract_wrap_overview_content} />
      </Card>
      <Card title={`${tr(contract_detail.code.title)} (${data?.language})`} ns='contract' className={style.contract_wrap_card}>
        {data?.source_file?.map((itemData: any,index:number) => {
          return <div className={style.contract_wrap_textMain} key={index }>
            <div className={style.contract_wrap_textMain_title}>
              <span className={style.contract_wrap_textMain_title_name}>
                { getSvgIcon('fileIcon')}
                {tr(itemData.file_name)}
              </span>

              <span className={style.contract_wrap_textMain_title_right}>
                { contract_detail.code.copy && <Copy text={itemData[contract_detail.code.content]} /> }
                { contract_detail.code.link && <Copy text={window?.location?.href} icon='linkIcon'/> }
              </span>
            </div>
            <div className={style.contract_wrap_textMain_codeContent}>
              <Editor value={itemData[contract_detail.code.content]} otherProps={{readOnly:true}}
              />
            </div>
          </div>

        })
        }
      </Card>
    </>}
    { data[contract_detail.abi.text] && <Card ns='contract'
      className={style.contract_wrap_card}
      header={
        <div className={style.contract_wrap_textMain_title}>
          <span className={style.contract_wrap_textMain_title_nameText}>{tr( contract_detail.abi.title)}</span>
          <span className={style.contract_wrap_textMain_title_right}>
            { contract_detail.abi.options && <Select className="custom_select"
              options={ contract_detail.abi.options.list}
              onChange={ handleClick}
              placeholder={tr( contract_detail.abi.options.placeholder)} />}

            { contract_detail.abi.copy && <Copy text={data[contract_detail.abi.text]} /> }
          </span>

        </div>
      }
    >
      <div className={style.contract_wrap_textMain}>
        <div className={style.contract_wrap_textMain_content}>{ data[ contract_detail.abi.text]}</div>
      </div>
    </Card>}

    {contract_detail.byte_code && <Card
      ns='contract'
      className={style.contract_wrap_card}
      header={
        <>
          { !data?.source_file ||Object.keys(data?.source_file).length === 0 && <div className={style.contract_wrap_textMain_toVerify}>
            {tr('byte_code_no_verify')}

            <Link href='//contract/verify' className="link">{ tr('go_to_verify')}</Link>

          </div>}

          <div className={style.contract_wrap_textMain_title}>
            <span className={style.contract_wrap_textMain_title_nameText}>{tr( contract_detail.byte_code.title)}</span>
            <span className={style.contract_wrap_textMain_title_right}>
              { contract_detail.abi.copy && <Copy text={data[contract_detail.byte_code.text]} /> }
            </span>

          </div>
        </>

      }
    >
      <div className={style.contract_wrap_textMain}>
        <div className={style.contract_wrap_textMain_content}>{ data[ contract_detail.byte_code.text]}</div>
      </div>
    </Card>}

    { data?.arguments && <Card ns='contract'
      className={style.contract_wrap_card}
      header={
        <div className={style.contract_wrap_textMain_title}>
          <span className={style.contract_wrap_textMain_title_nameText}>{tr('arguments')}</span>

        </div>
      }>
      <div className={style.contract_wrap_textMain}>
        <div className={style.contract_wrap_textMain_content}>{ data.arguments}</div>
      </div>
    </Card>}

  </div>
}