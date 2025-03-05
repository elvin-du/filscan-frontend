import { NetworkConfig } from '@/utils/network'
import Web3 from 'web3'

export async function getNetWork() {
  const web3 = new Web3(window.ethereum)
  const chainId = await web3.eth.getChainId()
  const network = process.env.NEXT_PUBLIC_NET_WORK ?? 'Mainnet'
  const config = NetworkConfig[network]
  return Number(chainId) === Number(config.chainId)
}

export const addNetwork = async () => {
  if (window.ethereum) {
    try {
      const network = process.env.NEXT_PUBLIC_NET_WORK ?? 'Mainnet'
      const config = NetworkConfig[network]
      const res = await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: config.chainId }],
      })
      return true
    } catch (e: any) {
      if (e.code === 4902) {
        try {
          //添加网络
          const network = process.env.NEXT_PUBLIC_NET_WORK ?? 'Mainnet'
          const config = NetworkConfig[network]
          const res = await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [config],
          })
          return true
        } catch (addError) {
          console.error(addError)
        }
      }
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert(
      'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html',
    )
  }
}

export const connect_account = () => {
  return new Promise((resolve, reject) => {
    window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((res: any) => {
        if (res) {
          resolve(res[0])
        }
      })
      .catch((error: any) => {
        if (error.code === 4001) {
          console.log('Please connect to TokenPocket Extension.')
        } else {
          console.error(error)
        }
      })
  })
}

// import { createContext } from 'react'

// const WalletState: any = createContext({
//   wallet: '',
//   account: 'zh-CN',
// })

// export default WalletState
