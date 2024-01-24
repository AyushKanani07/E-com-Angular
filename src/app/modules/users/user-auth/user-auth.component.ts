import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SellerService } from '../../services/seller-services/seller-login/seller.service';
import { Login, cart, product, signUp } from '../../services/seller-services/data-type';
import { UserLoginService } from '../../services/user-services/user-login/user-login.service';
import { ProductService } from '../../services/seller-services/products/product.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {

  hide = true;

  showLogin = false;
  authError:String='';

  openLogin(){
    this.showLogin = true;
  }
  openSignUp(){
    this.showLogin = false;
  }

  constructor(private user:UserLoginService, private product:ProductService){} 

  ngOnInit(): void {
    this.user.reloadUser();
  }

  signUp(data:signUp):void{
    // console.log(data)
    this.user.userSignUp(data);
    // location.reload();
  }

  login(data: Login): void{
    // console.log(data)
    this.user.userLogin(data)
    this.user.isLoginError.subscribe((isError) => {
      console.log(isError);
      if(isError){
        this.authError="Email or Password is not correct"
      }
      else{
        setTimeout(() => {
          this.locatCartToRemoteCart();
        },400)
        
      }
    })
  }

  locatCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if(data){
      let cartDataList:product[] = JSON.parse(data);
      

      cartDataList.forEach((product:product, index) => {
        let cartData:cart = {
          ...product,
          productId:product.id,
          userId
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            // console.log(result);
            if(result){
              
            }
          });
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart');
          }
        },400)
      });
    }

    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2100);
  }

}
