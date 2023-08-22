

export interface OPT_Value { 
   label: string;
   value: string;
}


export interface table_opt { 
    title?: string,
    label?:string,
    dataIndex: string,
    render?: Function,
    type?:Array<string>
    [key:string]:any
}


export interface Menu_Info { 
    key: string;
    out_key?: string;
    childrens?: Array<Menu_Info>;
    preIcon?: string;
    sufIcon?: string;
    link?: string;
    outLink?: string;
    color?:string
 }


 export interface Item {
  key: string;
  path: string;
}


export interface FILSCANSTATE {
    theme: string,
    lang: string,
}


export interface Card_meta { 
    title: NodeItem;
    list?:Array<ChartItem >
}

export interface NodeItem { 
   label: string;
   icon?: any;
   rightIcon?: string;
   tip?: string;
   render?: Function|any;
}


export interface ChartItem  extends NodeItem{ 
   yIndex?: number
   type?: string
}



export interface MenuItem extends Item { 
    childrens?: Array<MenuItem>
}


