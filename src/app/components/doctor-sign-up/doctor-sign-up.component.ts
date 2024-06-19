import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorRegisterService } from '../../services/AuthenticationServices/DoctorAuthentication/doctor-register.service';
import { DoctorRegisterDTO } from '../../models/Authentication/doctor-register-dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './doctor-sign-up.component.html',
  styleUrl: './doctor-sign-up.component.css'
})

export class DoctorSignUpComponent {
  isFormSubmitted = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private doctorRegisterService: DoctorRegisterService) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
      cardNumber: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(25), Validators.max(90)]],
      gender: [null, Validators.required],
      password: ['', Validators.required],
     // confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.registerForm);

    this.isFormSubmitted = true;
    if (this.registerForm.valid) {
      const registerDto: DoctorRegisterDTO = this.registerForm.value;
      console.log(registerDto);
      this.doctorRegisterService.registerDoctor(registerDto).subscribe({
        next: (response) => {
          // Handle successful response
          console.log('Account Created Successfully', response);
          // Optionally, you can reset the form after successful submission
          this.registerForm.reset();
          this.isFormSubmitted = false; // Reset form submission flag
        },
        error: (err) => {
          // Handle error response
          console.error('Error:', err);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

  onGenderChanged(value: string) {
    this.registerForm.patchValue({
      gender: value === 'female' ? 1 : 0
    });
  }
}

