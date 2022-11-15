import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs';
import { Profile } from './profile.model';
const GRAPH_ENDPOINT_GET_PHOTO = 'https://graph.microsoft.com/v1.0/me/photo/$value';
const GRAPH_ENDPOINT_ = 'https://graph.microsoft.com/v1.0/me';
@Injectable({
  providedIn: 'root'
})
export class MsalserviceService {

  constructor(private http:HttpClient) { }
  ngOnInit() {

  }
  getUserProfile(){
    return this.http.get<Profile>(GRAPH_ENDPOINT_);
  }
  getProfilePic(){
    return this.http.get(GRAPH_ENDPOINT_GET_PHOTO,
      {responseType:'blob'});
  }

}

