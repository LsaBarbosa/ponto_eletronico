import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ButtonComponent} from "../button-default/button.component";

@Component({
  selector: 'app-employee-button',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './employee-button.component.html',
  styleUrl: './employee-button.component.css'
})
export class EmployeeButtonComponent {
  linkUrlColaborador: string = '/opcao-colaborador';
  constructor(
    private router: Router,
  ) {}
  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
