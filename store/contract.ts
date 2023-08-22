import Web3 from 'web3';

const web3 = new Web3(window.ethereum);
export class contract {
    contractAbi: any;
    contractAddress: string;
    myContract: any;
    account: string ='';
    accountBalance: string | undefined;
    rate: number|string|undefined;
    myBorrowList: Array<any> =[];
    minerList: Record<string,any> = {};
    constructor(abi:string,address:string) {
        this.contractAbi = JSON.parse(abi);
        this.contractAddress = address;
        this.myContract = new web3.eth.Contract(this.contractAbi, this.contractAddress);
    }



    contractBalance() { 
        web3.eth.getBalance(this.contractAddress).then((res: any) => { 
            if (res) { 
                // store.dispatch({
                //     type: 'contract/change',
                //     payload: {
                //         contractBalanceRes:res,
                //         contractBalance: getValueDivide(Number(res), 18)
                //     }
                // })
            }
        })
    }

//     async callRpc(method:string, params: any) {
//     const options = {
//       method: "POST",
//       url: 'https://api.hyperspace.node.glif.io/rpc/v1',
//       headers: {
//           "Content-Type": "application/json",
//       },
//       data: JSON.stringify({
//         jsonrpc: "2.0",
//         method: method,
//         params: params,
//         id: 1,
//       }),
//     };
//         const res = await axios(options);
//         return res.data;
//   }


    
}
 


