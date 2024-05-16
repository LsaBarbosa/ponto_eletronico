import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "../button/button.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  linkUrlColaborador:string = "/colaborador";
  constructor(private router: Router) {

  }


  navigateTo(url: string) {
    this.router.navigate([url]);
  }


  username: string = '';
  password: string = '';

  login() {

    console.log('Username:', this.username);
    console.log('Password:', this.password);

    if (this.username === 'admin' && this.password === 'admin123') {
      console.log('Login bem-sucedido!');

    } else {
      console.log('Credenciais inválidas. Tente novamente.');

    }
  }
}
