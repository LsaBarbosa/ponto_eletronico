import {Component} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registers',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.css'
})
export class RegistersComponent{

  linkUrlCadastrar: string = '/cadastrar';
  linkUrlColaborador: string = '/colaborador';
  linkUrlSair: string = '/';
  linkUrlOvertime: string = '/registros/hora-extra';
  linkUrlRegistros: string = '/registros/por-data';


  constructor(
    private router: Router,

  ) {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

}
