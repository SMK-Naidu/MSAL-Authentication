import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MsalGuard, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, ProtectedResourceScopes} from '@azure/msal-angular';
import {InteractionType, IPublicClientApplication, PublicClientApplication} from '@azure/msal-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
export function MSAlInstanceFactory():IPublicClientApplication{
  return new PublicClientApplication({
    auth:{
      clientId:'8866c379-4efa-4d80-9399-2adbf02b523a',
      redirectUri:'http://localhost:4200',
      authority:'https://login.microsoftonline.com/8f6bd982-92c3-4de0-985d-0e287c55e379'
    }
  });
}
export function MSALInterceptorConfigFactory():MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read','mail.read']);
 return{
    interactionType:InteractionType.Popup,
    protectedResourceMap
  };
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    HttpClientModule
  ],
  providers: [{
    provide:MSAL_INSTANCE,
    useFactory:MSAlInstanceFactory
  },
  MsalService,
  { 
provide:HTTP_INTERCEPTORS,
useClass:MsalInterceptor,
multi:true
},{
  provide:MSAL_INTERCEPTOR_CONFIG,
  useFactory:MSALInterceptorConfigFactory
}
],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
