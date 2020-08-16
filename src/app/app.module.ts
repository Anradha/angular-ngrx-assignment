import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountCreateComponent } from './component/account-create/account-create.component';
import { LoginComponent } from './component/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { reducers } from './store/app.states';
import { LandingComponent } from './component/landing/landing.component';
import { AccountCreateLandingComponent } from './component/account-create-landing/account-create-landing.component';
import { ProfileComponent } from './component/profile/profile.component';
import { PasswordComponent } from './component/password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountCreateComponent,
    LoginComponent,
    LandingComponent,
    AccountCreateLandingComponent,
    ProfileComponent,
    PasswordComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'account/create', component: AccountCreateComponent },
      { path: 'account/create/landing', component: AccountCreateLandingComponent },
      { path: 'profile/set', component: ProfileComponent },
      { path: 'password/forgot', component: PasswordComponent },
      { path: '', component: LandingComponent },
      { path: '**', component: LoginComponent }
    ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
