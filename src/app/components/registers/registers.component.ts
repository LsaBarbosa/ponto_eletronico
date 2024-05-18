import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-registers',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.css'
})
export class RegistersComponent implements OnInit{

  linkUrlCadastrar: string = '/cadastrar';
  linkUrlSair: string = '/';
  linkUrlOvertime: string = '/registros/hora-extra';
  linkUrlRegistros: string = '/registros/por-data';
  username: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });
  }
}
