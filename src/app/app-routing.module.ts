import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanActivate  } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service'
import { importType } from '@angular/compiler/src/output/output_ast';
import { LoginComponent } from './login/login.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { MenulayoutComponent } from './menulayout/menulayout.component'
import { SignupComponent } from './signup/signup.component'
import { AppointmentComponent } from './appointment/appointment.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: MenulayoutComponent,
    children: [
      { path: 'list', component: DashboardComponent,canActivate: [AuthGuard] },
      { path: 'appointment', component: AppointmentComponent,canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
