import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule} from '@angular/forms';
import { SellerService } from '../../services/seller-services/seller-login/seller.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Login, signUp } from '../../services/seller-services/data-type';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [SharedModule, FormsModule],
  // providers: [HttpClientModule, HttpClient],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {

  hide = true;

  showLogin = false;
  authError:String='';

  openLogin(){
    this.showLogin = true;
  }
  openSignUp(){
    this.showLogin = false;
  }

  constructor(private seller:SellerService){} 

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(data:signUp):void{
    // console.log(data)
    this.seller.userSignUp(data);
    location.reload();
  }

  login(data: Login): void{
    // console.log(data)
    this.seller.userLogin(data)
    this.seller.isLoginError.subscribe((isError) => {
      console.log(isError);
      if(isError){
        this.authError="Email or Password is not correct"
      }
    })
  }

}
