import { Translation } from '@/components/hooks/Translation'
import { releaseList } from '@/contents/analysis'
import Table from '@/packages/Table'
import { useMemo } from 'react'
import style from './index.module.scss'
import { observer } from 'mobx-react'
import analysisStore from '@/store/modules/analysis'
export default observer(() => {
  const { tr } = Translation({ ns: 'analysis' })
  const { releaseData } = analysisStore

  const columns = useMemo(() => {
    return releaseList(tr).map((v) => {
      return { ...v, title: tr(v.title) }
    })
  }, [tr])
  return (
    <>
      <div className={style.release_title}>{tr('release_Calendar')}</div>
      <div className={style.release}>
        <Table
          data={[...releaseData]}
          total={releaseData.length}
          columns={columns}
          loading={false}
        />
      </div>
    </>
  )
})
