import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menulayout',
  templateUrl: './menulayout.component.html',
  styleUrls: ['./menulayout.component.css']
})
export class MenulayoutComponent implements OnInit {
  role:any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || ''
  }

  logOut (): void {
    console.log("logouttt")
    localStorage.clear()
    this.router.navigate(['/login']);
  }

}
