
import { Home_meta } from '@/types/home_types';

 const power:Home_meta = {
      title: {
        label: 'power',
        tip:'power_tips',
        }, 
        list: [
            { label: 'total_power', yIndex:0,type:'line'},
            { label: 'base_line_power' ,yIndex:0,type:'line'},
            {label:'total_increase_power',yIndex:1,type:'bar'},
        ],
 }

const gas: Home_meta = {
    title: {
        label: 'gas',
        tip:'gas_tips',
    },
    list: [{ label: 'base_fee', yIndex:0,type:'line'},
            { label: 'gas_in_32g' ,yIndex:1,type:'line'},
            {label:'gas_in_64g',yIndex:1,type:'line'},]
}

export const statistics:any = {
    power,
    gas
}
