import { navMenu } from "@/contants/nav"
import { useState } from "react"
import Image from 'next/image'
import styles from './index.module.scss'
import menuup from '@/assets/images/mobile/menuup.png'
import menudown from '@/assets/images/mobile/menudown.png'
import { useTranslation } from "react-i18next"
import { DownOutlined,UpOutlined } from "@ant-design/icons";
import Link from "next/link"
import { Modal } from "antd"
import { useRouter } from "next/router"

function Menu() { 
  const { t, i18n } = useTranslation();
    const tr = (label: string): string => {
        return t(label, { ns: "nav" });
    };
    
      const router = useRouter()

    const [showMenu, setShow] = useState(false)
    const [select, setSelect] = useState('')
    
    const handleClick = (link?:string) => { 
        if (link) router.push(link);
        setShow(false)
    }

    const renderMenu = (menuItem: Array<any>) => { 
        return  menuItem?.map((child:any) => { 
            return <div className={styles.mobile_menu_ul_item_li} onClick={ ()=>handleClick(child.link)}>
                 {tr(child.key)}
            </div>
        })
    }

    return <div className={styles.mobile_menu}>
        <Image src={showMenu ? menudown : menuup} width={ 32} alt='menu' onClick={() => { setShow(!showMenu) }} />
        <div className={styles.mobile_menu_ul} style={{display: showMenu ? 'block':'none'}}>
              {navMenu.map((menu,index)=> { 
            if (menu.childrens ) {
                return <div key={ index} className={styles.mobile_menu_ul_item}>
                    <div className={styles.mobile_menu_ul_item_select} onClick={() => {
                        setSelect( select === menu.key ? '': menu.key)
                    }}>
                        {tr(menu.key)} { select === menu.key ? <UpOutlined rev={undefined} /> :<DownOutlined rev={undefined} />}
                    </div>
                    <div style={{display: select === menu.key ? 'block':'none'}}>
                    {renderMenu(menu.childrens)}
                    </div>
                </div>
            }
                  return <div key={ index} className={styles.mobile_menu_ul_item} onClick={ ()=>handleClick(menu.link)}>
                      {tr(menu.key)}
                     
                  </div>
            })
        }
        </div>
        <div className={styles.mobile_menu_mask} style={{ display: showMenu ? 'block' : 'none' }} onClick={() => { 
                    setShow(false)
        }} />
      
      
    </div>

}
export default Menu