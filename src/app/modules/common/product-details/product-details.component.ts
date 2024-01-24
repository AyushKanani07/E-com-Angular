import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/seller-services/products/product.service';
import { cart, product } from '../../services/seller-services/data-type';
import { SharedModule } from '../../shared/shared.module';
import { stringify } from 'querystring';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  productData:undefined | product;
  productQuantity:number=1;
  removeCart = false;
  cartData:product | undefined;

  constructor(private activeRoute:ActivatedRoute, private product:ProductService) {}

  ngOnInit(): void {
    let productId= this.activeRoute.snapshot.paramMap.get('productId');
    // console.log(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      // console.log(result);
      this.productData = result;

      let cartData = localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product) => productId == item.id.toString());
        if(items.length){
          this.removeCart = true;
        }
        else{
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user)[0].id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item:product) => productId?.toString()===item.productId?.toString());

          if(item.length){
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }
      

    })
  }

  quantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity += 1;
    }
    else if(this.productQuantity>1 && val==='min'){
      this.productQuantity -= 1;
    }
  }

  AddToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;

      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
        this.removeCart=true;
      }
      else{
        let user = localStorage.getItem('user');
        // console.log(user)
        let userId = user && JSON.parse(user)[0].id;
        // console.log(userId);
        let cartData:cart = {
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
        // console.log(cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          console.log(result);
          if(result){
            this.product.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }

  removeToCart(productId:string){
    if(!localStorage.getItem('user')){
      this.product.removeToCart(productId);
      this.removeCart=false;
    }
    else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user)[0].id;
      this.cartData && this.product.removeTodbCart(this.cartData.id).subscribe((result) => {
        if(result){
          this.product.getCartList(userId);
        }
      });
      this.removeCart=false;
    }
  }

}
