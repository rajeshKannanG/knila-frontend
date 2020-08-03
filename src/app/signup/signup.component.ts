import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordValidation } from '../utils/password-validor'
import { ApiservicesService } from '../services/apiservices.service'

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  //public selectedValue: string;
  form: FormGroup;
  returnUrl: string;
  errMsg: string;

  list: Food[] = [
    { value: 'doctor', viewValue: 'Doctor' },
    { value: 'patient', viewValue: 'Patients' }
  ];
  public loginInvalid: boolean
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public apiService: ApiservicesService
  ) {
  }

  ngOnInit(): void {
    this.apiService.rolecall("/drop-down/role", {}).subscribe(resp => {
      console.log(resp, 'responseeeee')
      if ((resp && resp.success)) {
        this.list = []
        this.list = [...resp.data] || []
      }
    });
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.email],
      city: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      selectedValue: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
  }


  onSubmit(): void {
    this.loginInvalid = false;
    console.log("insideTwo", this.form)
    if (this.form.valid) {
      console.log(this.form.valid)
      try {
        const userName = this.form.get('userName').value
        const email = this.form.get('email').value
        const city = this.form.get('city').value
        const selectedValue = this.form.get('selectedValue').value
        const password = this.form.get('password').value
        const formData = { userName, email, roleId: selectedValue, location: city, password }
        console.log(formData, 'formdattaaa')
        this.apiService.signUpcall("/signUp", formData).subscribe(resp => {
          console.log(resp, 'responseeeee')
          if ((resp && resp.success)) {
            this.returnUrl = '/login';
            this.router.navigate([this.returnUrl]);
          } else {
            this.loginInvalid = true
            this.errMsg = (resp && !resp.success && resp.msg) ? resp.msg : 'Internal Error'
          }
        });
      } catch (error) {
        console.log("Error:", error)
        this.loginInvalid = true
        this.errMsg = 'signUp Error'
      }
    }
  }
}