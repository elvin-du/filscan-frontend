import { Form } from "antd"
import Header from './header'

export default () => { 
    return <div>
    <Header />
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    autoComplete="off">
        
    </Form>
    </div>
}