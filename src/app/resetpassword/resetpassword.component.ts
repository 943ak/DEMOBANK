import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimatedBackgroundComponent } from "../animated-background/animated-background.component";

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule, AnimatedBackgroundComponent],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  password = '';
  confirmPassword = '';
  newPasswordVisible = false;
  confirmPasswordVisible = false;

  passwordConditions = {
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
    passwordMatch: false
  };

  constructor(private router: Router) { }

  onPasswordChange() {
    this.passwordConditions.length = this.password.length >= 8;
    this.passwordConditions.uppercase = /[A-Z]/.test(this.password);
    this.passwordConditions.lowercase = /[a-z]/.test(this.password);
    this.passwordConditions.number = /[0-9]/.test(this.password);
    this.passwordConditions.specialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.password);
    this.passwordConditions.passwordMatch = this.password === this.confirmPassword;
  }

  onConfirmPasswordChange() {
    this.passwordConditions.passwordMatch = this.password === this.confirmPassword;
  }

  onResetPassword() {
    // Simulate password reset success and navigate to login
    console.log('Password reset successfully!');
    this.router.navigate(['/']);
  }

  toggleNewPasswordVisibility() {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
}
