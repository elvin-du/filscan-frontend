export interface Item {
  key: string;
  path: string;
}

export interface MenuItem extends Item { 
    childrens?: Array<MenuItem>
}