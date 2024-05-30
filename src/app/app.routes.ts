import {Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {EmployeeComponent} from "./components/employee/employee.component";
import {RegistersComponent} from "./components/registers/registers.component";
import {NewEmployeeComponent} from "./components/new-employee/new-employee.component";
import {SearchByDateComponent} from "./components/search-by-date/search-by-date.component";
import {OvertimeComponent} from "./components/overtime/overtime.component";
import {AuthGuardService} from "./service/auth-guard.service";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'colaborador',
    component: EmployeeComponent,
     canActivate:[AuthGuardService]
  },
  {
    path: 'registros',
    component: RegistersComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'cadastrar',
    component: NewEmployeeComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'registros/por-data',
    component: SearchByDateComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'registros/hora-extra',
    component: OvertimeComponent,
    canActivate:[AuthGuardService]
  },
];
