import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ButtonComponent} from "../button/button.component";

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
  username: string = '';
  password: string = '';

  login() {
    // Aqui você pode adicionar a lógica para autenticar o usuário
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Exemplo de lógica de autenticação
    if (this.username === 'admin' && this.password === 'admin123') {
      console.log('Login bem-sucedido!');
      // Redirecionar ou realizar outra ação após o login
    } else {
      console.log('Credenciais inválidas. Tente novamente.');
      // Exibir uma mensagem de erro ou tomar outra ação se as credenciais forem inválidas
    }
  }
}
