import { getSvgIcon } from "@/svgUtils"
import { message } from "antd";

export default ({ text,icon ,className}: {text:string,icon?:string,className?:string}) => { 
    const handleClick = () => { 
        //copy
        navigator.clipboard.writeText(text).then(function() {
            /* clipboard successfully set */
            message.success('clipboard successfully')
            }, function() {
            /* clipboard write failed */
            });
    }
    return <span style={{ cursor: 'pointer' }} className={ className} onClick={ handleClick}>{ getSvgIcon(icon ||'copy')}</span>
}