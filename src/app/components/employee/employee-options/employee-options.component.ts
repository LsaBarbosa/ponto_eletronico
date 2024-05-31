import { Component } from '@angular/core';
import {ButtonComponent} from "../../button/button-default/button.component";
import {LogoutComponent} from "../../login/logout/logout.component";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {BackButtonComponent} from "../../button/back-button/back-button.component";

@Component({
  selector: 'app-employee-options',
  standalone: true,
  imports: [
    ButtonComponent,
    LogoutComponent,
    NgIf,
    BackButtonComponent
  ],
  templateUrl: './employee-options.component.html',
  styleUrl: './employee-options.component.css'
})
export class EmployeeOptionsComponent {

  linkUrlCadastrar: string = '/cadastrar';
  linkUrlBuscar: string = '/buscar-colaborador';
  linkUrlEditar: string = '/editar-colaborador';
  linkUrlDeletar: string = '/deletar-colaborador';

  constructor(
    private router: Router,
  ){}
  navigateTo(url: string) {
    this.router.navigate([url])
  }
}
