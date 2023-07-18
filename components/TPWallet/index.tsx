import Image from '@/packages/image';
import Tp from '@/assets/images/TokenPocket.png';
import { useEffect } from 'react';
import { getImgUrl } from '@/utils/utils';

export default ({ data }: {data:Record<string,any>}) => { 
    const handleClick = () => { 
        if (!window.ethereum) {
            //dowm wallet 
            window.open(`https://www.tokenpocket.pro/`);
        } else { 
              window.ethereum.request({ method: 'eth_requestAccounts' })
             .then((res:any) => { 
                  addToken(res[0]);
             })
            .catch((error:any) => {
            if (error.code === 4001) {
                // EIP-1193 userRejectedRequest error
                console.log('Please connect to TokenPocket Extension.');
            } else {
                console.error(error);
            }
            })
        }
       ;
    }



    const addToken = async (address:string) => { 
        const tokenAddress = address;
        const tokenSymbol = data?.tokenName;
        const tokenDecimals = 18;
        const tokenImage = getImgUrl(data?.token_name);
        try {
                // wasAdded is a boolean. Like any RPC method, an error can be thrown.
            const wasAdded = await window.ethereum.request({
                    method: 'wallet_watchAsset',
                    params: {
                    type: 'ERC20', // Initially only supports ERC-20 tokens, but eventually more!
                    options: {
                        address: tokenAddress, // The address of the token.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
                        decimals: tokenDecimals, // The number of decimals in the token.
                        image: tokenImage, // A string URL of the token logo.
                    },
                    },
                });
             if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
                }
            } catch (error) {
                console.log(error);
            }
    }
    return <div>
        <Image onClick={ handleClick} src={Tp} width={18}  alt='tp wallet' style={{cursor:'pointer',borderRadius:'30%'}} />
    </div>
}