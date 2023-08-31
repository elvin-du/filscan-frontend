import { DownOutlined, UpOutlined } from "@ant-design/icons"
import { useState } from "react"
import style from './index.module.scss'

interface Props {
    title: string,
    children?:JSX.Element
}

export default (props: Props) => {
  const {title,children } = props
  const [show,setShow] = useState(false)
  return <div className={style.show_content}>
    <div className={style.show_content_name} onClick={() => setShow(!show)}>
      <span> {title}</span>

      { show ?<DownOutlined rev={undefined} />: <UpOutlined rev={undefined} />}
    </div>
    <div className={style.show_content_main} style={{display:show?'block':'none'}}>
      { children}
    </div>
  </div>
}