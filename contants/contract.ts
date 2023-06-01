export const verify: any = {
    content: {
        list: [
            { label: 'content_des1', },
            { label: 'content_des2', },
           { label: 'content_des3'},
        ],
        buttons: [
            {
                label: 'source_code',
                 className: 'custom_ok_btn'
            },
            //  {
            //      label: 'compile_output',
            //       className: 'custom_border_btn'
            // }
        ],

    },
    main: {
        header: {
            title: 'verify_title',
            des: 'verify_des',
        },
        content: {
            des: 'content_des',
            list: [
                {
                    type: 'Input',
                    dataIndex: 'contract_address',
                    title: 'address',
                    placeholder: 'address_placeholder',
                   
                },
                {
                    type: 'Select',
                    title: 'verify_address',
                    dataIndex: 'compile_version',
                    placeholder: 'verify_select_placeholder',
                },
                {
                    type: 'Select',
                    title: 'license_type',
                    dataIndex: 'license',
                    placeholder: 'verify_select_placeholder',
                    options: [
                        {
                            label: 'No License(None)',
                            value: 'No license(None)'
                        },
                        {
                            label: 'MIT License(MIT)',
                            value: 'MIT license(MIT)'
                        }
                    ]
                }
            ],
            // other:[
            //     {
            //         type: 'checkbox',
            //         title: 'checkbox_service',
            //         title_hidden: true,
            //         style: {textAlign:'center'},
            //         dataIndex:'checkbox_service',
            //     }
            // ]

           
        },
         buttons: [
                {
                 text: 'next',
                className: 'custom_ok_btn',
                disableList:['contract_address','compile_version']
                },
                {
                    text: 'reset',
                    className: 'custom_cancel_btn'
                }
            ]
    },
  
    contract: {
        header: {
            title: 'verify_title',
            des:'step1_verify_des'
        },
        content: {
            list: [
                {
                    type: 'Input',
                    disabled:true,
                    dataIndex: 'contract_address',
                    title: 'address_verify',
                    style: {
                        flex:1
                    }
               
                },
                {
                    type: 'Input',
                    disabled:true,
                    dataIndex: 'compile_version',
                    title: 'compile_version',
                     style: {
                        width:'30%'
                    }
                },
                {
                    type: 'Select',
                    title: 'Optimizations',
                    dataIndex: 'optimize',
                    defaultValue:'true',
                    style: {
                    width: '10%',
                    },
                    options: [
                        {
                            label: 'Yes',
                            value: 'true'
                        },
                        {
                            label: 'No',
                            value: 'false'
                        }
                    ]
                },
              {
                    type: 'Input',
                    title: 'run_optimizer',
                    dataIndex: 'optimize_runs',
                    defaultValue: 200,
                    style: {
                    width: '15%',
                    },
                  
              },
             
            ],
            other: [
                 {
                    type: 'textArea',
                    title: 'arguments',
                    style: {textAlign:'left'},
                    dataIndex:'arguments',
                }
            ]
        },
        buttons: [
                {
                 text: 'confirm',
                className: 'custom_ok_btn',
                },
                {
                    text: 'reset',
                    className: 'custom_cancel_btn'
               },
                 {
                    text: 'back',
                    className: 'custom_border_btn'
                }
            ]
        
        


    }

  
}

//详情概况
export const detail_overview = [
    {
        dataIndex: 'cid',
        label: 'cid'
    },
     {
        dataIndex: 'cid',
        label: 'cid'
    },
      {
        dataIndex: 'cid',
        label: 'cid'
    }, {
        dataIndex: 'cid',
        label: 'cid'
    }, {
        dataIndex: 'cid',
        label: 'cid'
    },
]