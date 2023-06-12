const contract = {

    overview: '概览',
    market: 'Market',

    next: '下一步',
    reset: '重置',
    confirm: '验证并发布',
    back: '返回',
    file_name: '选择 *.sol 文件',
    verify_title: '验证并发布合约源代码',
    verify_des: '编译器类型和版本选择',
    content_des: '源代码验证为与智能合约交互的用户提供了透明度。通过上传源代码，Filscan 将编译后的代码与区块链上的代码进行匹配。就像合同一样，“智能合同”应该为最终用户提供更多关于他们“数字签名”的目的的信息，并让用户有机会审核代码以独立验证它是否确实做了它应该做的事情。',
    address: '请输入您要验证的合约地址',
    address_placeholder: '请输入您要验证的合约地址',
    verify_address: '请选择编译版本',
    verify_address_placeholder: '请选择',
    license_type: '请输入开源许可证类型',
    content_des1: '1. 如果合同在 REMIX 处编译正确，则此处也应编译正确',
    content_des2: '2. 我们对验证由另一个合约创建的合约的支持有限，编译的每个合约的超时时间最多为45秒',
    content_des3: '3. 对于编程合同验证，请查看合同 API 端点',
    checkbox_service: '我同意服务条款',
    verify_select_placeholder: '请选择',
   

    //logs
     ver_sucess: 'Success: 验证成功',
    ver_err:'Error: 验证失败',
    byte_code: '编译日志',
    contract_name:'合约名',
    local_byte_code: '合约字节码',
    compiler:'编译器版本',
    //step1
    address_verify: '合约地址',
    step1_verify_des: '请选择单个或多个 *.SOL 文件',
    source_code: '合约源码',
    compile_version: '编译器',
    compile_output: '编译输出',
    Optimizations: '优化参数',
    run_optimizer: '运行(优化器)',
    arguments: '构造函数参数',
    optimize: '优化开启',
    optimize_runs: 'RUNS',
    
    //token list 
    token_list:'全部代币',
    token_name: 'Token',
    vol_24: '成交量(24h)',
    
    transfer_total:'共 {{value}} 条消息',
    owner_total:'总共 {{value}} 人持有',
    dex_total:'共 {{value}} 条交易',


    // ft /fns dashborad
    'total_supply': 'MAX总供应量',
    'owners': '持有人',
    'transfers': '总共转移',
    latest_price: '价格',
    market_value: '市值',
    token_contract: '代币合约',
    transfer: '转移',
    owner: '拥有者',
    domain: '合约',
    dex: 'DEX 交易',
    
    //list 
    message_cid: '消息ID',
    method: 'Method',
    time: '时间',
    from: '发送地址',
    to: '接收地址',
    amount: '数量',
    //拥有者
    rank: '排行',
    percentage: '百分率',

    //dex
    platform: '交易平台',
    Txn_Value: 'Txn Value',
    'swapped_Rate': 'Swapped Rate',
    'Token_Amount_in': 'Token Amount(In)',
    'Token_Amount_out': 'Token Amount(Out)',
    Action:'Action',
}
export default contract