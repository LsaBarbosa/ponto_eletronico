import { Component } from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  linkUrlCadastrar: string = '/cadastrar';
  linkUrlSair: string = '/';
  linkUrlRegistros: string = '/registros';

  constructor(private router: Router) {

  }


  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
