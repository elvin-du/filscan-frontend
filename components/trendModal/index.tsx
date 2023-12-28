import TrendIcon from '@/assets/images/TrendIcon.svg'
import Segmented from '@/packages/segmented'
import AccountChange from '@/src/detail/accountChange'
import { Modal } from 'antd'
import { useState } from 'react'
import style from './index.module.scss'
import { address_detail } from '@/contents/detail'
import { Translation } from '../hooks/Translation'

interface Props {
  account: string
}
export default (props: Props) => {
  const { account } = props
  const [isModalOpen, setModalOpen] = useState(false)
  const [active, setActive] = useState('1m')
  const { tr } = Translation({ ns: 'detail' })

  return (
    <div className={style.modalAccount}>
      <span
        className={style.modalAccount_icon}
        onClick={() => {
          setModalOpen(true)
        }}
      >
        <TrendIcon />
      </span>
      <Modal
        title=""
        width={1000}
        open={isModalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
        wrapClassName="custom_modal " //noTopModal
      >
        <div className={style.modalAccount_content}>
          <AccountChange
            header={
              <div
                className="mx-2.5 mb-2.5 mt-5 flex items-center justify-between"
                key="detail_account_change"
              >
                <span className="HarmonyOS_Medium text-lg  font-medium">
                  {tr('account_change')}
                </span>
                <Segmented
                  data={[
                    { title: '7d', dataIndex: '7d' },
                    { title: '30d', dataIndex: '1m' },
                  ]}
                  ns="detail"
                  defaultValue={active}
                  isHash={false}
                  onChange={(value: string) => {
                    setActive(value)
                  }}
                />
              </div>
            }
            accountId={account}
            interval={active}
            list={address_detail.account_change.list}
          />
        </div>
      </Modal>
    </div>
  )
}
