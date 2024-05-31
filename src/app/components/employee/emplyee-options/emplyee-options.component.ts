import { Component } from '@angular/core';
import {ButtonComponent} from "../../button/button-default/button.component";
import {LogoutComponent} from "../../login/logout/logout.component";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {BackButtonComponent} from "../../button/back-button/back-button.component";

@Component({
  selector: 'app-emplyee-options',
  standalone: true,
  imports: [
    ButtonComponent,
    LogoutComponent,
    NgIf,
    BackButtonComponent
  ],
  templateUrl: './emplyee-options.component.html',
  styleUrl: './emplyee-options.component.css'
})
export class EmplyeeOptionsComponent {

  linkUrlCadastrar: string = '/cadastrar';
  linkUrlBuscar: string = '/bucar-colaborador';
  linkUrlEditar: string = '/editar-colaborador';
  linkUrlDeletar: string = '/deletar-colaborador';

  constructor(
    private router: Router,
  ){}
  navigateTo(url: string) {
    this.router.navigate([url])
  }
}
