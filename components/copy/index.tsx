import { getSvgIcon } from "@/svgUtils"
import { message } from "antd";

export default ({ text }: {text:string}) => { 
    const handleClick = () => { 
        //copy
        navigator.clipboard.writeText(text).then(function() {
            /* clipboard successfully set */
            message.success('clipboard successfully')
            }, function() {
            /* clipboard write failed */
            });
    }
    return <span style={{cursor:'pointer'}}  onClick={ handleClick}>{ getSvgIcon('copy')}</span>
}