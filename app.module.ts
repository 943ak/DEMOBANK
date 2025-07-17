import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './src/app/app.routes';
import { LoginComponent } from './src/app/login/login.component';
import { ForgotPasswordComponent } from './src/app/forgot-password/forgot-password.component';
import { OTPComponent } from './src/app/otp/otp.component';
import { ResetpasswordComponent } from './src/app/resetpassword/resetpassword.component';
import { BrowserModule } from '@angular/platform-browser';
import { AnimatedBackgroundComponent } from './src/app/animated-background/animated-background.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    LoginComponent,
    ForgotPasswordComponent,
    OTPComponent,
    ResetpasswordComponent,
    AnimatedBackgroundComponent
  ]
})
export class AppModule { }
