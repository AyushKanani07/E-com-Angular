import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/seller-services/products/product.service';
import { priceSummary } from '../../services/seller-services/data-type';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {

  cartData:any | undefined;
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }

  constructor(private product:ProductService, private router:Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  checkOut(){
    this.router.navigate(['/checkout'])
  }

  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      console.log(result);
      this.cartData=result;

      let totalPrice = 400000;

      // result.forEach((item)=> {
      //   if(item.quantity){
      //     totalPrice = totalPrice + (+item.price * +item.quantity );
      //   }
      // })
      console.log(totalPrice);

      this.priceSummary.price=totalPrice;
      this.priceSummary.tax=totalPrice/10;
      this.priceSummary.discount=totalPrice/4;
      this.priceSummary.delivery=100;

      this.priceSummary.total=totalPrice+(totalPrice/10)+100-(totalPrice/4);

      if(!this.cartData.length){
        this.router.navigate(['/']);
      }
    })
  }

  removeToCart(cartId:any | undefined){
    cartId && this.cartData && this.product.removeTodbCart(cartId).subscribe((result) => {
      this.loadDetails();
    });
  }

}
