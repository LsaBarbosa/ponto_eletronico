import {Component} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmployeeModule} from "../../../module/employee.module";
import {NgIf} from "@angular/common";
import {LogoutComponent} from "../logout/logout.component";
import {PrimaryInputComponent} from "../primary-input/primary-input.component";
import {LoginService} from "../../service/login.service";
import {BackButtonComponent} from "../button/back-button/back-button.component";

interface SignupForm {
  name: FormControl<string>;
  password: FormControl<string>;
  role: FormControl<string>;
}


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css'],
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    EmployeeModule,
    ReactiveFormsModule,
    PrimaryInputComponent,
    NgIf,
    LogoutComponent,
    BackButtonComponent,
  ],
})
export class NewEmployeeComponent {
  signupForm!: FormGroup<SignupForm>;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private loginService: LoginService,
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    } as SignupForm);
  }

  submit() {
    this.successMessage = null;
    this.errorMessage = null;
    if (this.signupForm.valid) {
      this.loginService.signup(
        this.signupForm.value.name!,
        this.signupForm.value.password!,
        this.signupForm.value.role!
      ).subscribe({
        next: () => {
          this.successMessage = 'Cadastro feito com sucesso!';

        },
        error: () => {
          this.errorMessage = 'Erro inesperado! Tente novamente';

        }
      });
    }
  }
}
