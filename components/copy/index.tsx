import { getSvgIcon } from "@/svgUtils"
import { message } from "antd";
import copy from 'copy-to-clipboard'


export default ({ text,icon ,className}: {text:string,icon?:string,className?:string}) => { 
    const handleClick = () => { 
        //copynavigator
        copy(text);
        return  message.success('clipboard successfully')
        // navigator?.clipboard?.writeText(text).then(function() {
        //     /* clipboard successfully set */
        //     message.success('clipboard successfully')
        //     }, function() {
        //     /* clipboard write failed */
        //     message.warning('clipboard failed')

        //     });
    }
    return <span style={{ cursor: 'pointer',color:'rgb(154,154,154)' }} className={`flex-center ${className}`} onClick={ handleClick}>{ getSvgIcon(icon ||'copy')}</span>
}