import { Button, Modal } from "antd"
import { useContext, useState } from "react";
import Image from '@/packages/image'
import style from './index.module.scss'
import { addNetwork, connect_account, getNetWork } from "@/store/wallet";
import WalletStore from "@/store/wallet";
import { isIndent } from "@/utils/utils";

const WalletList = [
    {
        label: 'TokenPocket',
        value: 'TokenPocket',
        url: 'https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii',
        icon:'https://filscan-v2.oss-cn-hongkong.aliyuncs.com/fvm_manage/images/TokenPocket.png'
    },
     {
        label: 'MetaMask',
        value: 'MetaMask',
         url: 'https://metamask.io/',
        icon:'https://filscan-v2.oss-cn-hongkong.aliyuncs.com/fvm_manage/images/MetaMask.png'
    },

]

function Wallet() { 
    const [isModalOpen, setIsModalOpen] = useState(false);
    
  const { wallet, setWallet } = useContext<any>(WalletStore);

    const handleClick = async (item: any) => { 
        if (item.value === 'TokenPocket') { 
            if (!window?.ethereum.isTokenPocket) {
            //dowm wallet 
            window.open(item.url);
            window.location.reload()
        }
        }
        const chainId = await getNetWork();
        let account:any = ''
        if (!chainId) {
                    // 切换网络
                    const res = await addNetwork();
                    if (res) {
                        account = await connect_account()
                    }
                } else { 
                    account = await connect_account()
                }
                const new_wallet = {
                    wallet: item.value,
                    account 
                }
                localStorage.setItem('wallet', JSON.stringify(new_wallet))
                 setWallet(new_wallet);
        console.log('000e---wallte')
        setIsModalOpen(false)
    }


    return <>
        {wallet.account ? <div className={style.connect_wallet}>
            <span  className={style.connect_wallet_icon} />
            {`Connected - Web3 [${isIndent(wallet.account,4)}]`}
        </div>: <Button className="custom_border_btn mt-10" onClick={()=>setIsModalOpen(true)}>Connect Wallet</Button>}
        <Modal title="Connect a Wallet"
            open={isModalOpen}
            footer={ null}
            onCancel={() => setIsModalOpen(false)}>
            <div className={ style.wallet_des} >
            Connecting wallet for read function is optional, useful if you want to call certain functions or simply use your wallet's node.
            </div>
            {WalletList.map((wallet_Item:any) => {
                return <div className={style.wallet_item} key={wallet_Item.value} onClick={ ()=>handleClick(wallet_Item)}>
                    <Image className={ style.wallet_item_image}  src={wallet_Item.icon} width={25} height={ 25} alt='' />
                    <span className={ style.wallet_item_name}>{ wallet_Item.label}</span>
                </div>
             })}
      </Modal>
    </>
}

export default Wallet

