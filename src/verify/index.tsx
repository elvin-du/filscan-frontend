import { Form, Input, Select } from "antd"
import Header from './header';
import { verify } from '@/contants/contract'
import { useMemo, useState } from "react";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";

export default () => {
    const [step, setStep] = useState('main');
     const { t } = useTranslation();
  const tr = (label: string) => {
    return t(label, { ns: "contract" });
  };
    const showData = useMemo(() => {
        return verify[step]
    }, [step])
    

    const renderItem = (data: any) => {
        let content = null;
        switch (data.type) {
            case 'Input':
                content = <Input className="custom_input" placeholder={tr(data?.placeholder)} />
                break;
            case 'Select':
                content = <Select className="custom_select" options={data.options} />
        }
        return <Form.Item name={ data.dataIndex } label={tr(data.title)}>
            {content }
        </Form.Item>
    }

    return <div className={styles.verify}>
        <Header data={showData.header} />
        <div className={styles.verify_content_des}>
                { tr(showData.content.des)}
        </div>
        <Form
        name="basic"
            layout="vertical"
            style={{ maxWidth: 680 }}
         className='custom_vertical_form'
        initialValues={{ remember: true }}
        autoComplete="off">
         {showData?.content?.list?.map((item:any) => { 
             return renderItem(item)
        })}     
        </Form>
    </div>
}