import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Router } from '@angular/router';
import { ProductService } from '../../services/seller-services/products/product.service';
import { product } from '../../services/seller-services/data-type';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menuType:String = 'default'
  sellerName:string='';
  userName:string='';
  searchResult:undefined | product[];
  cartItems = 0;

  constructor(private route:Router, private product:ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val:any) => {
      
      if(val.url){
        console.log(val.url);
        if(localStorage.getItem('seller') && val.url.includes('seller')){
          // console.log('This is seller area');
          let sellerStore=localStorage.getItem('seller');
          let sellerData =sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName=sellerData.name;
          this.menuType='seller'
        }
        else if(localStorage.getItem('user')){
          let userStore=localStorage.getItem('user');
          let userData =userStore && JSON.parse(userStore)[0];
          this.userName=userData.name;
          this.menuType='user'
          this.product.getCartList(userData.id)
        }
        else{
          // console.log('Outside to seller area')
          this.menuType='default'
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    })
  }

  sellerLogout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.product.cartData.emit([]);
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.product.serchProducts(element.value).subscribe((result) => {
        // console.log(result);
        if(result.length>5){
          result.length=5;
        }
        this.searchResult=result;
      })
    }
  }

  hideSearch(){
    this.searchResult=undefined;
  }

  submitSearch(val:string){
    // console.log(val);
    this.route.navigate([`search/${val}`]);
  }

  redirectToDetails(id:string){
    this.route.navigate(['/Details/'+id]);
  }

}
