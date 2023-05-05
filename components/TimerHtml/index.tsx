import { formatTime } from "@/utils/utils"
import style from './index.module.scss'
import { useEffect, useState } from "react"

export default (props:any)=> { 
    const { text, tr } = props
        const [show,setShow]= useState('')
    const showTime = (number: number) => { 
        let showText =''
               const { days, hours, minutes,seconds } = formatTime(Number(number * 1000),)
                if (days !== 0) {
                    showText= `${days}${tr('day')} ${hours}${tr('hours')} ${minutes}${tr('minutes')} `
                } else if (hours !== 0) { 
                    showText= `${hours}${tr('hours')} ${minutes}${tr('minutes')} ` 
                }
               showText= `${minutes}${tr('minutes')} ${seconds}${tr('seconds')} `
        setShow(showText)
    }
    useEffect(() => { 
        const interval = setInterval(() => {
            showTime(text)
        }, 1000);

        return () => { 
            clearInterval(interval)
        }


    },[text])


    console.log('===3',show)

    return <div className={style.value}>{ show}</div>
    
}