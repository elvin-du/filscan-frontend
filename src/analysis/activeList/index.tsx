import { Translation } from '@/components/hooks/Translation'
import { activeList } from '@/contents/analysis'
import Table from '@/packages/Table'
import { useMemo } from 'react'
import style from './index.module.scss'
import { observer } from 'mobx-react'
import analysisStore from '@/store/modules/analysis'
import Tooltip from '@/packages/tooltip'
export default observer(() => {
  const { fileActiveList } = analysisStore
  const { tr } = Translation({ ns: 'analysis' })

  const columns = useMemo(() => {
    return activeList.map((v) => {
      return { ...v, title: tr(v.title) }
    })
  }, [tr])
  return (
    <>
      <div className={style.release_title}>
        <span className={style.release_title_text}>
          {tr('top_active_address')}
        </span>
        <Tooltip context={tr('top_active_address_tip')} />
      </div>
      <div className={style.release}>
        <Table
          data={fileActiveList}
          columns={columns}
          loading={false}
          // onChange={handleChange}
        />
      </div>
    </>
  )
})
