import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AutoRequestComponent} from "./components/utils/auto-request/auto-request.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AutoRequestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ponto_eletronico';
}
