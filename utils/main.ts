// 是否Erc20 类型
export const getErc20 = (type:string) => {
  return ['account', 'ethaccount', 'evm','multisig'].find(v=>v === type.toLocaleLowerCase())
}