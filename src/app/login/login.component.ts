import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../services/apiservices.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  returnUrl: string;
  errMsg: string;
  public loginInvalid: boolean
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public apiService: ApiservicesService
  ) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.email],
      password: ['', Validators.required]
    });
    //console.log("insideOne", this.route.snapshot.queryParams['returnUrl'])
  }

  onSubmit(): void {
    this.loginInvalid = false;
    //console.log("insideTwo", this.form)
    if (this.form.valid) {
      //console.log(this.form.valid)
      try {
        const userName = this.form.get('userName').value
        const password = this.form.get('password').value
        const formData = {email: userName, password}
        this.apiService.apiLogincall("/signIn", formData).subscribe(resp => {
         // console.log(resp, 'responseeeee')
          if((resp && !resp.success)){
            this.loginInvalid =  true
            this.errMsg = resp.msg || 'Incorrect data'
          }else{
            localStorage.clear()
            localStorage.setItem('token',resp.token)
            localStorage.setItem('role',resp.role)
            this.returnUrl =  '/list';
            this.router.navigate([this.returnUrl]);
          }
        });
      } catch (error) {
        console.log("Error:", error)
        this.loginInvalid = true
        this.errMsg = 'internal error'
      }
    }
  }

}
