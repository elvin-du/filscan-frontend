

export interface OPT_Value { 
   label: string;
   value: string;
}



export interface Menu_Info { 
    key: string;
    childrens?: Array<Menu_Info>;
   icon?: string;
   link?: string;
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
   render?: Function;
}


export interface ChartItem  extends NodeItem{ 
   yIndex?: number
   type?: string
}



export interface MenuItem extends Item { 
    childrens?: Array<MenuItem>
}


