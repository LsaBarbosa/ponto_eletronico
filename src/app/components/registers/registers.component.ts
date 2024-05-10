import { Component } from '@angular/core';
import {ButtonComponent} from "../button/button.component";

@Component({
  selector: 'app-registers',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './registers.component.html',
  styleUrl: './registers.component.css'
})
export class RegistersComponent {

}
