import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private msalService:MsalService) { }

  ngOnInit(): void {
  }
getName(){
  return this.msalService.instance.getActiveAccount()?.name
}
}
