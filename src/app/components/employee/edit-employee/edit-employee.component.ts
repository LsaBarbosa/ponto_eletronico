import { Component } from '@angular/core';
import {ButtonComponent} from "../../button/button-default/button.component";
import {EmployeeButtonComponent} from "../../button/employee-button/employee-button.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LogoutComponent} from "../../login/logout/logout.component";
import {NgIf} from "@angular/common";
import {PrimaryInputComponent} from "../../login/primary-input/primary-input.component";
import {LoginService} from "../../../service/login.service";
import {EmployeeService} from "../../../service/employee.service";
interface EditForm {
  name: FormControl<string>;
  password: FormControl<string>;
  role: FormControl<string>;
}
@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    ButtonComponent,
    EmployeeButtonComponent,
    FormsModule,
    LogoutComponent,
    NgIf,
    PrimaryInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  editForm!: FormGroup<EditForm>;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private employeeService: EmployeeService,
  ) {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    } as EditForm);
  }

  submit() {
    this.successMessage = null;
    this.errorMessage = null;
    if (this.editForm.valid) {
      this.employeeService.update(
        this.editForm.value.name!,
        this.editForm.value.password!,
        this.editForm.value.role!
      ).subscribe({
        next: () => {
          this.successMessage = 'Alteração feito com sucesso!';

        },
        error: () => {
          this.errorMessage = 'Usuário sem permissão';

        }
      });
    }
  }
}
