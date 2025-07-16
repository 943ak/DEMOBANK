import { Routes }                     from '@angular/router';
import { LoginComponent }             from './login/login.component';
import { ForgotPasswordComponent }    from './forgot-password/forgot-password.component';
import { OTPComponent }               from './otp/otp.component';
import { ResetpasswordComponent }     from './resetpassword/resetpassword.component';
import { SecurityquestionsComponent } from './securityquestions/securityquestions.component';
import { DashboardComponent }         from './dashboard/dashboard.component';


export const routes: Routes = [
  { path: '',                component: LoginComponent, data: { animation: 'fade' } },
  { path: 'login',           component: LoginComponent, data: { animation: 'fade' } },
  { path: 'forgot-password', component: ForgotPasswordComponent, data: { animation: 'fade' } },
  { path: 'otp',             component: OTPComponent, data: { animation: 'fade' }},
  { path: 'reset-password',  component: ResetpasswordComponent, data: { animation: 'fade' } },
  { path: 'securityquestions', component: SecurityquestionsComponent, data: { animation: 'fade' } },
  { path: 'dashboard',       component: DashboardComponent, data: { animation: 'fade' } }
];
