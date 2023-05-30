import { getSvgIcon } from "@/svgUtils"
import styles from "./index.module.scss";

const footerLinks = [
  {
    label: "twitter",
    type:'_blank',
    link:'https://twitter.com/FilscanOfficial'
  },
    {
      label: "telegram",
          type:'_blank',
    link:'https://t.me/+bI9fUEkmPjMzYjg1'
  },
      {
        label: "outlook",
            type:'_self',
    link:'mailto:filscan@ipfsforce.com'
  }
]

export default () => { 
    return <div className={ styles.links}>
        {footerLinks.map((linkItem:any) => { 
            return <a key={linkItem.label} className={ styles.links_item} target={linkItem.type } style={{ color: '#fff' }} href={linkItem.link}>{
            getSvgIcon(linkItem.label)}</a>  
        })}
    </div> 
}