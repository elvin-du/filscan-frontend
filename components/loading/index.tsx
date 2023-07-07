import { LoadingOutlined } from "@ant-design/icons"
import style from './index.module.scss'

export default () => { 
        return <div className={ style.loading_wrap}>
        <LoadingOutlined style={{ fontSize: 36 }} rev={undefined} />
  </div> 
}