import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ApiservicesService } from '../services/apiservices.service'
import { elementAt } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[];
  errMsg: string;
  isErr: boolean;
  dataSource: any;
  role: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public apiService: ApiservicesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.isErr = false
    this.role = localStorage.getItem('role')
    //console.log("role", this.role)
    try {
      this.dataTable()
    } catch (error) {
      console.log("Error", error)
      this.isErr = true
      this.errMsg = 'Data Not Found'
    }

  }

  appointment(data, type): void {
    //return
    Swal.fire({
      title: 'Are you sure?',
      text: `Appointment is ${type}`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${type}`
    }).then((result) => {
      console.log(result.value, 'trueee')
      if (result.value) {
       // console.log('isnidee')
        this.apiService.appointmentcall("/appointment-update", { appointmentId: data.appointmentId, status: type }).subscribe(resp => {
          console.log(resp, 'responseeeee')
          if ((resp && resp.success)) {
            this.dataTable()
          }
        });
      }
    })
  }
  

  moveTo(): void {
    //return
    this.router.navigate(['/appointment']);
  }

  dataTable(): void {
    this.apiService.apiListcall("/list", {}).subscribe(resp => {
     // console.log(resp, 'responseeeee')
      if ((resp && resp.success)) {
        let data = resp.data.list || []

        if (data.length) {
          this.dataSource = new MatTableDataSource<PeriodicElement>(data);
          this.dataSource.paginator = this.paginator;
          this.displayedColumns = ['email', 'name', 'appointmentDate', 'action']
        } else {
          this.displayedColumns = []
          this.isErr = true
          this.errMsg = 'Data Not Found'
        }
      }
    });
  }

}




