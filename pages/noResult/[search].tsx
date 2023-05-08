

import { no_result } from '@/contants/home'
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import noImg from '@/assets/images/no-result.png';
import style from './index.module.scss'

export default () => { 
      const router = useRouter();
  const { search } = router.query;
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "home" });
  };
    return <div className={ style.noResult_main} >
      <div className={ style.noResult}>
        <h3  className={ style.noResult_title}>{tr(no_result.title)}</h3>  
        <div className={ style.noResult_content}>
          {tr(no_result.warn_text)}
          <span>{search }</span>
        </div>
        <div className={ style.noResult_deta}>
          { tr(no_result.warn_details)}
        </div>
        <div className={ style.noResult_btnHome}>{ tr(no_result.go_home)}</div>
        </div>

    </div>
}