import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ButtonComponent} from "../../button/button-default/button.component";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  linkUrlSair: string = '/';

constructor( private router: Router,) {
}
  logout() {
    sessionStorage.removeItem('username'); // Remove o nome da sessão
    this.router.navigate([this.linkUrlSair]);
  }
}
