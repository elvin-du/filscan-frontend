import { fvmUrl } from "@/contants/apiUrl"
import { LeftCircleOutlined, LeftOutlined, RightCircleOutlined, RightOutlined } from "@ant-design/icons"
import { Carousel } from "antd"
import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { Image } from 'antd'
import style from './index.module.scss'
import FilscanState from "@/store/content"

function Banner(props: any) { 
    const filscanStore: any = useContext(FilscanState);
    const carousel= useRef<any>(null)
    const [data, setData] = useState([])
    const url = filscanStore.filscan.lang === 'zh' ? fvmUrl + '/banner/zh_banner.json' : fvmUrl + '/banner/en_banner.json';
          useEffect(() => { 
             axios.get(url).then(res => { 
            setData(res?.data ||[])
        })
          }, [filscanStore.filscan.lang])
    if (data.length === 0) { 
        return null
    }
    return <div className={style.banner_wrap}>
        <span className={`${style.banner_wrap_icon} ${style.banner_wrap_leftIcon}`} onClick={() => { 
            if (carousel.current) { 
                carousel?.current?.prev()
            }

        }}>
            <LeftOutlined  rev={undefined} />
        </span>
        
        <Carousel dots={false} arrows={true} ref={ carousel} className="custom-carousel" >
            {data.map((item: any,index) => {
              
                return <div onClick={() => { 
                    if (item.link) { 
                        window.open(item.link)
                    }
                }}>
                    <Image preview={ false} src={`${fvmUrl}/banner/image/${item.pic}`} alt='' style={{width:'100%'}}   />
                    </div>
            })}
        </Carousel>
        <span className={`${style.banner_wrap_icon} ${style.banner_wrap_rightIcon}`} onClick={() => { 
             if (carousel.current) { 
                carousel?.current?.next()
            }
        }}>
            <RightOutlined rev={undefined} />
        </span>
        
    </div>
}

export default Banner

