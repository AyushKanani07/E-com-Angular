import { EventEmitter, Injectable } from '@angular/core';
import { Login, signUp } from '../../seller-services/data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  isUserLoogedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false)

  constructor(private _http:HttpClient, private router:Router) { }

  userSignUp(user:signUp){
    this._http.post("http://localhost:3000/users",user,{observe:'response'}).subscribe((result) => {
      // console.log(result);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
    })
  }

  reloadUser(){
    if(localStorage.getItem('user')){
      this.isUserLoogedIn.next(true);
      this.router.navigate(['/'])
    }
  }

  userLogin(data: Login){
    // console.log(data);
    this._http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((result: any) => {
      // console.log(result);
      if(result && result.body && result.body.length===1){
        this.isLoginError.emit(false);
        localStorage.setItem('user',JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
      else{
        // alert("Wrong Details Login Faild...!")
        this.isLoginError.emit(true);
      }
    })
  }
}
