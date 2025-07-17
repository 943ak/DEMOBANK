import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router} from '@angular/router';
import { AnimatedBackgroundComponent } from "../animated-background/animated-background.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, AnimatedBackgroundComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  constructor(private router: Router) { }

  onLogin() {
    console.log('Login clicked');
    this.router.navigate(['/securityquestions']);
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
