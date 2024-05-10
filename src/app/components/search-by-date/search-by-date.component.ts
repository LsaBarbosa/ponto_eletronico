import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../button/button.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-by-date',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './search-by-date.component.html',
  styleUrl: './search-by-date.component.css'
})
export class SearchByDateComponent {
  linkUrlRegistros: string = '/registros';

  constructor(private router: Router) {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  username: string = '';
  startDate: string = '';
  endDate: string = '';
  searchByDate() {

    console.log('Username:', this.username);
    console.log('startDate:', this.startDate);
    console.log('endDate:', this.endDate);
    if (this.username === 'admin' && this.startDate === 'admin123') {
      console.log('Login bem-sucedido!');
     } else {
      console.log('Credenciais inválidas. Tente novamente.');

    }
  }
}
