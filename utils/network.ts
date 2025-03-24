export const NetworkConfig: Record<string, any> = {
  Calibration: {
    chainId: '0x4cb2f',
    chainName: 'Filecoin - Calibration',
    nativeCurrency: {
      name: 'Calibration',
      symbol: 'tFIL',
      decimals: 18,
    },
    rpcUrls: ['https://filecoin-calibration.chainup.net/rpc/v1'],
    blockExplorerUrls: ['https://calibration.filscan.io'],
  },

  Mainnet: {
    chainId: '0x13a',
    chainName: 'Filecoin - Mainnet',
    nativeCurrency: {
      name: 'Mainnet',
      symbol: 'FIL',
      decimals: 18,
    },
    rpcUrls: ['https://api.node.glif.io/'],
    blockExplorerUrls: ['https://filscan.io'],
  },
}
