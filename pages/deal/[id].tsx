import { useRouter } from "next/dist/client/router";
import Card from '@/packages/card';
import Content from '@/packages/content';
import { deal, deal_hosting } from '@/contants/detail';
import style from './index.module.scss'

export default () => { 
      const router = useRouter();
    const { id } = router.query;
        console.log('====3',id)

    return <div>
        <Card title={deal.title} ns='detail' >
         <Content
          content={deal.list}
          data={  {}}
          ns={"detail"}
        /> 
        </Card>
        <Card title={deal_hosting.title} ns='detail'>
            <div className={style.hosting}>
                <div className={style.hosting_left}></div>
                <div className={style.hosting_content}></div>
                <div className={style.hosting_right}></div>
            </div>
        </Card>
    </div> 
}