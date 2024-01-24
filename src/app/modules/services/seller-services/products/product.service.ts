import { Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[] | []>();

  constructor(private http:HttpClient) { }

  addProduct(data:product){
    console.log("services is called");
    return this.http.post('http://localhost:3000/products',data);
  }

  productList(){
    return this.http.get<product[]>('http://localhost:3000/products');
  }

  deleteProduct(id:string){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data: product){
    return this.http.put(`http://localhost:3000/products/${data.id}`, data);
  }

  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=7');
  }

  trendyProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }

  serchProducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data:product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    }
    else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeToCart(productId:string){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let item:product[] = JSON.parse(cartData);
      item = item.filter((item:product) => productId!==item.id);
      localStorage.setItem('localCart', JSON.stringify(item));
      this.cartData.emit(item);
    }
  }

  addToCart(cartData:cart){
    return this.http.post('http://localhost:3000/cart',cartData);
  }

  getCartList(userId:string){
    return this.http.get<product[]>('http://localhost:3000/cart?userId='+userId,
    {observe:'response'}).subscribe((result) => {
      console.log(result);
      if(result && result.body){
        this.cartData.emit(result.body);
      }
    });
  }

  removeTodbCart(cartId:string){
    return this.http.delete('http://localhost:3000/cart/'+cartId);
  }

  currentCart(){
    let userStore=localStorage.getItem('user');
    let userData =userStore && JSON.parse(userStore)[0];

    return this.http.get('http://localhost:3000/cart?userId='+userData.id);
  }

  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }

  deleteCartItems(cartId: string) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }

  cancelOrder(orderId:string){
    return this.http.delete('http://localhost:3000/orders/'+orderId)

  }
}
