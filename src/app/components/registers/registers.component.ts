import {Component} from '@angular/core';
import {ButtonComponent} from "../button/button-default/button.component";
import {Router} from "@angular/router";
import {LogoutComponent} from "../login/logout/logout.component";
import {BackButtonComponent} from "../button/back-button/back-button.component";


@Component({
  selector: 'app-registers',
  standalone: true,
  imports: [
    ButtonComponent,
    LogoutComponent,
    BackButtonComponent,
  ],
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.css'
})
export class RegistersComponent{
  linkUrlOvertime: string = '/registros/hora-extra';
  linkUrlRegistros: string = '/registros/por-data';


  constructor(
    private router: Router,

  ) {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

}
