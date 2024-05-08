import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {EmployeeComponent} from "./components/employee/employee.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'colaborador',
    component: EmployeeComponent,
  },
];
