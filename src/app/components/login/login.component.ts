import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "../button/button.component";
import {Router} from "@angular/router";
import {EmployeeModule} from "../../../module/employee.module";
import {RecordWorkTimeModule} from "../../../module/record-work-time.module";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent,
    EmployeeModule,
    RecordWorkTimeModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  linkUrlColaborador: string = "/colaborador";

  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  login() {

    this.router.navigate([this.linkUrlColaborador], { queryParams: { username: this.username } });
  }
}
