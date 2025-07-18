import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AnimatedBackgroundComponent } from "../animated-background/animated-background.component";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterModule, AnimatedBackgroundComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private router: Router) {}

  resetPassword() {
    console.log('Reset password requested for:', this.email);
    // Navigate to the OTP page after the form is submitted
    this.router.navigate(['/otp']);
  }
}
