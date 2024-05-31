import {Component} from '@angular/core';
import {ButtonComponent} from "../../button/button-default/button.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmployeeModule} from "../../../../module/employee.module";
import {NgIf} from "@angular/common";
import {LogoutComponent} from "../../login/logout/logout.component";
import {PrimaryInputComponent} from "../../login/primary-input/primary-input.component";
import {LoginService} from "../../../service/login.service";
import {BackButtonComponent} from "../../button/back-button/back-button.component";
import {EmployeeButtonComponent} from "../../button/employee-button/employee-button.component";
import {LoginResponse} from "../../../types/login-response";
import {ErrorHandlerComponent} from "../../error-handler/error-handler.component";
import {HttpErrorResponse} from "@angular/common/http";

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
        EmployeeButtonComponent,
        ErrorHandlerComponent,
    ],
})
export class NewEmployeeComponent {
  signupForm!: FormGroup<SignupForm>;
  successMessage: string | null = null;
  error: HttpErrorResponse | null = null;

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
    this.error = null;
    if (this.signupForm.valid) {
      this.loginService.signup(
        this.signupForm.value.name!,
        this.signupForm.value.password!,
        this.signupForm.value.role!
      ).subscribe({
        next: () => {
          this.successMessage = 'Cadastro feito com sucesso!';
        },
        error: (error: HttpErrorResponse) => {
          this.error = error;
        }
      });

    }
  }
}
