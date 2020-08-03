import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from '../services/apiservices.service'



interface Doctor {
  value: string;
  viewValue: string;
}

interface location {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  //public selectedValue: string;
  form: FormGroup;
  returnUrl: string;
  errMsg: string;
  minDate: Date;
  maxDate: Date;
  selectedVal: any;
  drList: Doctor[] = [
    { value: 'doctor', viewValue: 'Doctor' },
    { value: 'patient', viewValue: 'Patients' }
  ];
  // locationList: location[] = [
  //   { value: 'doctor', viewValue: 'Doctor' },
  //   { value: 'patient', viewValue: 'Patients' }
  // ];

  public loginInvalid: boolean
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public apiService: ApiservicesService
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 1, 11, 31);
  }

  ngOnInit(): void {
    this.selectedVal = ''
    this.apiService.doctorcallList("/drop-down/doctor", {}).subscribe(resp => {
      console.log(resp, 'responseeeee')
      if ((resp && resp.success)) {
        this.drList = []
        this.drList = [...resp.data] || []
      }
    });
   /* this.apiService.locationcallList("/drop-down/location", {}).subscribe(resp => {
      console.log(resp, 'responseeeee')
      if ((resp && resp.success)) {
        // this.locationList = []
        // this.locationList = [...resp.data] || []
      }
    });*/

    this.form = this.fb.group({
     // selectedLocation: ['', Validators.required],
      selectedDr: ['', Validators.required],
      appointmentDate: ['', Validators.required]
    });
  }

  onSelectChange(): void{
    console.log("received", this.form.get('selectedDr').value)
    let data =  this.form.get('selectedDr').value
    this.selectedVal = data.locationName || 'None'
  }

  onSubmit(): void {
    this.loginInvalid = false;
    console.log("insideTwo", this.form)
    if (this.form.valid) {
      console.log(this.form.valid)
      try {
        const userDetail = this.form.get('selectedDr').value
        //const selectedLocation = this.form.get('selectedLocation').value
        const appointmentDate = this.form.get('appointmentDate').value.toISOString()
        const formData = { 
          doctorId: userDetail.userId, 
          appointmentDate, 
          locationId:userDetail.locationId 
        }//locationId: selectedLocation }
        //console.log(formData, 'formdattaaa')
        this.apiService.appointmentcall("/appointment", formData).subscribe(resp => {
          //console.log(resp, 'responseeeee')
          if ((resp && resp.success)) {
            this.returnUrl = '/list';
            this.router.navigate([this.returnUrl]);
          } else {
            this.loginInvalid = true
            this.errMsg = (resp && !resp.success && resp.msg) ? resp.msg : 'Internal Error'
          }
        });
      } catch (error) {
        console.log("Error:", error)
        this.loginInvalid = true
        this.errMsg = 'appointment Error'
      }
    }
  }
}
