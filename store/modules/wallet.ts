import { makeAutoObservable, makeObservable, observable } from 'mobx'

class WalletStore {
  wallet: string
  account: string
  constructor() {
    this.wallet = ''
    this.account = ''
    makeAutoObservable(this)
  }

  setWallet(walletItem: any) {
    //  this.walletCard = walletItem
    this.wallet = walletItem?.wallet
    this.account = walletItem?.account
  }
}

const walletStore = new WalletStore()

export default walletStore
