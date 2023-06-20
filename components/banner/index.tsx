import { fvmUrl } from "@/contants/apiUrl"
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons"
import { Carousel } from "antd"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Image } from 'antd'
import style from './index.module.scss'
import FilscanState from "@/store/content"

function Banner(props: any) { 
    const filscanStore: any = useContext(FilscanState);
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
    return <div >
        <LeftCircleOutlined rev={undefined} />
        <Carousel dots={ false} className="custom-carousel" >
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
        <RightCircleOutlined rev={undefined} />
    </div>
}

export default Banner