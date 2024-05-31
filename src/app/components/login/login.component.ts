import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonComponent} from "../button/button.component";
import {EmployeeModule} from "../../../module/employee.module";
import {RecordWorkTimeModule} from "../../../module/record-work-time.module";
import {NgIf} from "@angular/common";
import {LoginService} from "../../service/login.service";
import {PrimaryInputComponent} from "../primary-input/primary-input.component";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

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

  ],
  providers: [
    LoginService,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registerSuccess: boolean = false;
  registerFailure: boolean = false;
  errorMessageTimeout: any;
  errorMessage: string = '';
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
          this.registerFailure = false;
          sessionStorage.setItem('username', name);
          this.resetErrorMessage();
          this.router.navigate(['/colaborador']);
        },
        error: (error: HttpErrorResponse) => {
          this.registerSuccess = false;
          this.registerFailure = true;
          this.errorMessage = this.getErrorMessage(error, 'entrada');
          this.resetErrorMessage();
        }
      });
    }
  }

  getErrorMessage(error: HttpErrorResponse, action: string): string {
    if (error.status === 404) {
      return `Colaborador não cadastrado`;

    } else if (error.status === 400) {
      if (action === 'entrada') {
        return 'Usuário ou senha inválidos';

      } else if (action === 'saída') {
        return 'Erro inesperado, tente novamente';
      }
    }
    return `Erro inesperado no servidor`;
  }

  resetErrorMessage() {
    this.errorMessageTimeout = setTimeout(() => {
      this.registerFailure = false;
      this.errorMessage = '';
    }, 3000); // Tempo em milissegundos (5 segundos)
  }

}
