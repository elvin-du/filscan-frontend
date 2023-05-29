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
             {
                 label: 'compile_output',
                  className: 'custom_border_btn'
            }
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
                    dataIndex: 'address',
                    title: 'address',
                    placeholder: 'address_placeholder',
                   
                },
                {
                    type: 'Select',
                    title: 'verify_address',
                    dataIndex: 'compile_version',
                    placeholder: 'verify_address_placeholder',
                    options: [
                        {
                            label: 'v0.8.19+commit.7dd6d404',
                            value: 'v0.8.19+commit.7dd6d404'
                        },
                        {
                            label: 'v0.8.19+commit.87f61d96',
                            value: 'v0.8.19+commit.87f61d96'
                        },
                        {
                            label: 'v0.8.19+commit.8df45f5f',
                            value: 'v0.8.19+commit.8df45f5f'
                        },
                        {
                            label: 'v0.8.19+commit.07a7930e',
                            value: 'v0.8.19+commit.07a7930e'
                        },

                    ]
                },
                {
                    type: 'Select',
                    title: 'license_type',
                    dataIndex: 'license',
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
           
        },
         buttons: [
                {
                 text: 'next',
                dataIndex:'step1',
                className: 'custom_ok_btn'
                    
                },
                {
                    text: 'reset',
                    dataIndex:'main',
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
                    dataIndex: 'address',
                    title: 'address_verify',
                    style: {
                        flex:1
                    }
               
                },
                {
                    type: 'Input',
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
                    style: {
                    width: '10%',
                    },
                    options: [
                        {
                            label: 'Yes',
                            value: true
                        },
                        {
                            label: 'No',
                            value: false
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
             
             ]
        },

        
        


    }

  
}