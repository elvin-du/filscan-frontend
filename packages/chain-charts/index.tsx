/** @format */

import { resultObj } from "@/contants/rank";
import styles from "./index.module.scss";
interface Props {
  data: Array<any>;
}

/*

[
    {
        "height": "2702223",
        "result": [
            {
                "height": 2702223,
                "cid": "bafy2bzacedi3ku5lgrah24bpbc3nzzdmk6mvnp7uz7xqaewy4e4kj4tgwc4jk",
                "block_time": 1679373090,
                "miner_id": "f01730206",
                "messages_count": 73,
                "reward": "17181821363891693270",
                "mined_reward": null,
                "tx_fee_reward": null
            },
            {
                "height": 2702223,
                "cid": "bafy2bzaceajq3xcgfkip2nnfrw7evsd6evjkf3amfyza3ed6rm4novveb3thg",
                "block_time": 1679373090,
                "miner_id": "f0112087",
                "messages_count": 91,
                "reward": "17201373133804117024",
                "mined_reward": null,
                "tx_fee_reward": null
            }
        ]
    },  
    
        ]
    },
    
   
    
   
          
]
*/

export default (props: Props) => {
  const { data } = props;
  console.log('----4',data)
  return (
    <div className={styles.chain_chart}>
      <div className={styles.chain_chart_container}>
         {data.map((item,index) => {
        return (
          <div key={index} className={styles.chain_chart_container_card}>
            {item.result.map((resultObj:any) => { 
              return <div key={ resultObj?.miner_id }  className={styles.chain_chart_container_card_miner}>{ resultObj?.miner_id ||''}</div>
            })}
          </div>
          
        );
      })}

      </div>
      <div className={styles.tipset_list}>
      {data.map((item) => {
        return (
          <div key={item?.height } className={styles.tipset_list_item}>        
            <span className={styles.tipset_list_item_value}> {item?.height}</span>
             <span className={styles.tipset_list_item_icon}/>
          </div>
          
        );
      })}
    </div>
    </div>
  
  );
};
