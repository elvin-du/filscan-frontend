export const verify: any = {
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
                    dataIndex: 'verify_address',
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
                    dataIndex: 'license_type',
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
                    className: 'custom_ok_btn'
                    
                },
                {
                    text: 'reset',
                    className: 'custom_cancel_btn'
                }
            ]
    },

  
}