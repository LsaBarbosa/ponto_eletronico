import { Component } from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-employee',
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule
  ],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent {
  username: string = '';
  password: string = '';
  register() {
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
