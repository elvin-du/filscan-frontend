import { Translation } from '@/components/hooks/Translation'
import { releaseList } from '@/contents/analysis'
import Table from '@/packages/Table'
import { useMemo } from 'react'
import style from './index.module.scss'
import { observer } from 'mobx-react'
import analysisStore from '@/store/modules/analysis'
import { formatNumber } from '@/utils'
import TrendModal from '@/components/trendModal'

export default observer(() => {
  const { tr } = Translation({ ns: 'analysis' })
  const { releaseData } = analysisStore

  const columns = useMemo(() => {
    return releaseList(tr).map((v: any) => {
      const obj = { ...v }
      if (v.title === 'account_balance') {
        obj.render = (text: string | Number, record: any) => {
          return (
            <span className="flex items-center gap-x-1">
              {formatNumber(Number(text), 0)}
              <TrendModal account={record.account_id} />
            </span>
          )
        }
      }
      return { ...obj, title: tr(v.title) }
    })
  }, [tr])
  return (
    <>
      <div className={style.release_title}>{tr('release_Calendar')}</div>
      <div className={style.release}>
        <Table
          data={[...releaseData]}
          total={releaseData.length}
          // limit={5}
          columns={columns}
          loading={false}
        />
      </div>
    </>
  )
})
