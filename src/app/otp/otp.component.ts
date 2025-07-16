import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OTPComponent implements OnInit {
  otpForm: FormGroup;
  @Output() otpSubmit = new EventEmitter<string>();
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(private fb: FormBuilder, private router: Router) {
    this.otpForm = this.fb.group({
      otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required, Validators.maxLength(1)])
    });
  }

  ngOnInit(): void {}

  onKeyUp(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    const key = event.key;

    if (key >= '0' && key <= '9' && input.value) { // Move to next input if a digit is entered
      if (index < this.otpInputs.length - 1) {
        this.otpInputs.toArray()[index + 1].nativeElement.focus();
      }
    } else if (key === 'Backspace' && !input.value) {
      if (index > 0) { // Move to previous input on backspace if current is empty
        this.otpInputs.toArray()[index - 1].nativeElement.focus();
      }
    }
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      const otp = Object.values(this.otpForm.value).join('');
      this.otpSubmit.emit(otp);
      console.log('OTP Submitted:', otp);
      // Assuming OTP is valid, navigate to the reset password page.
      this.router.navigate(['/reset-password']);
    } else {
      console.log('Form is invalid');
      this.otpForm.markAllAsTouched();
    }
  }
}