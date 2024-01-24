import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Login, signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoogedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private _http:HttpClient, private router:Router){ }
  userSignUp(data: signUp){
    this._http.post('http://localhost:3000/seller', data,{observe:'response'}).subscribe((result)=>{
      // console.log(result);
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
    })
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoogedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: Login){
    // console.log(data);
    this._http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((result: any) => {
      // console.log(result);
      if(result && result.body && result.body.length===1){
        this.isLoginError.emit(false);
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
      else{
        // alert("Wrong Details Login Faild...!")
        this.isLoginError.emit(true);
      }
    })
  }


}
