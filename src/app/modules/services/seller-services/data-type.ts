export interface signUp {
    name:string,
    email:string,
    password:string
}

export interface Login{
    email: string,
    password: string
}
export interface product{
    id:string
    name:string,
    image:string,
    price:number,
    currency:string,
    category:string,
    description:string
    quantity?:undefined | number,
    productId:undefined | string
}

export interface cart{
    id:string | undefined
    name:string,
    image:string,
    price:number,
    currency:string,
    category:string,
    description:string
    quantity?:undefined | number,
    userId: string,
    productId:string
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface order {
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:string,
    id:string|undefined
  }