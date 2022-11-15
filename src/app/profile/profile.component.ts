import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MsalService } from '@azure/msal-angular';
import { MsalserviceService } from '../msalservice.service';
import { Profile } from '../profile.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 profile?:Profile;
 profilePic!: SafeResourceUrl;
 constructor(private msalService:MsalserviceService, private httpClient:HttpClient, private sanitizer:DomSanitizer ) { }
ngOnInit(): void {
   this.getProfile();
   this.getProfilePic();
  }
 getProfile(){
  this.msalService.getUserProfile().subscribe(profileInfo=>{
    this.profile=profileInfo;
  })
 }
 getProfilePic(){
  this.msalService.getProfilePic().subscribe(response=>{
  
    var urlCreator = window.URL || window.webkitURL;
    this.profilePic = this.sanitizer.bypassSecurityTrustResourceUrl(urlCreator.createObjectURL(response));
    console.log(this.profilePic)
  });
 }
}

