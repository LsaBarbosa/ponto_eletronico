import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonComponent} from "../button/button-default/button.component";
import {EmployeeModule} from "../../../module/employee.module";
import {RecordWorkTimeModule} from "../../../module/record-work-time.module";
import {NgIf} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {PrimaryInputComponent} from "./primary-input/primary-input.component";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorHandlerComponent} from "../error-handler/error-handler.component";

interface LoginForm {
  name: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    EmployeeModule,
    RecordWorkTimeModule,
    FormsModule,
    NgIf,
    PrimaryInputComponent,
    ErrorHandlerComponent,

  ],
  providers: [
    LoginService,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registerSuccess: boolean = false;
  error: HttpErrorResponse | null = null;
  loginForm!: FormGroup<LoginForm>;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required,])
    })
  }

  submit() {
    if (this.loginForm.valid) {
      const name = this.loginForm.value.name;
      const password = this.loginForm.value.password;
      this.loginService.login(name, password).subscribe({
        next: () => {
          this.registerSuccess = true;
          this.error = null;
          sessionStorage.setItem('username', name);

          this.router.navigate(['/colaborador']);
        },
        error: (error: HttpErrorResponse) => {
          this.registerSuccess = false;
          this.error = error;
        }
      });
    }
  }
}
