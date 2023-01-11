export interface Item {
  key: string;
  value: string;
}

export interface MenuItem extends Item { 
    path?: string;
    childrens?: Array<MenuItem>
}