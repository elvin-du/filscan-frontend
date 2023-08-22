import {  LeftOutlined, RightOutlined } from "@ant-design/icons"
import { Carousel } from "antd"
import {  useEffect, useRef, useState } from "react"
import { Image } from 'antd'
import style from './index.module.scss'

function Banner({ banner =[],lang }: {banner:Array<any>,lang?:string}) { 
    const carousel= useRef<any>(null)
    const [data, setData] = useState(banner)
  
    useEffect(() => { 
        setData(banner)
    }, [banner])
    


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
        
        <Carousel dots={false} arrows={true} autoplay ref={ carousel} className="custom-carousel" >
            {[...data]?.map((item: any,index) => {
              
                return <div key={ index} onClick={() => { 
                    if (item.link) { 
                        window.open(item.link)
                    }
                }}>
                    <Image preview={false} src={item.url} alt='' width='100%'  />
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

