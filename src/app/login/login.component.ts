import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  apiResponse!: string;
  givenName:string | undefined;
  photo!: string;
isIframe: any;
loginDisplay: any;
title: any;
  constructor(private msalService:MsalService, private httpClient:HttpClient) {

   }
   ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
     res => {
      if (res != null && res.account != null){
        this.msalService.instance.setActiveAccount(res.account)
      }   
     } 
    )
  }
isLoggedIn():boolean{
  return this.msalService.instance.getActiveAccount()!= null
}
  
login(){
  this.msalService.loginRedirect();
  // this.msalService.loginPopup().subscribe((response: AuthenticationResult)=>{
  //   this.msalService.instance.setActiveAccount(response.account)
  // });
}
logout(){
  this.msalService.logout();
}
getName(){
  if (this.msalService.instance.getActiveAccount() == null){
    return 'unknown'
  }
  return this.msalService.instance.getActiveAccount()?.name
}
callProfile(){
  this.httpClient.get("https://graph.microsoft.com/v1.0/me").subscribe(res =>{
    this.apiResponse =JSON.stringify(res)
  })
}
callPhoto(){
  this.httpClient.get("https://graph.microsoft.com/v1.0/me/photo/$value").subscribe(res =>{
    this.apiResponse =JSON.stringify(res)
    
  })
}
callMessages(){
  this.httpClient.get("https://graph.microsoft.com/v1.0/me/messages").subscribe(res =>{
    this.apiResponse =JSON.stringify(res)
  })
}

}
