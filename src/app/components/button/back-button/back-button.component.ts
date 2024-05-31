import {Component} from '@angular/core';
import {ButtonComponent} from "../button-default/button.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent {
  linkUrlColaborador: string = '/colaborador';
  constructor(
    private router: Router,
  ) {}
  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
