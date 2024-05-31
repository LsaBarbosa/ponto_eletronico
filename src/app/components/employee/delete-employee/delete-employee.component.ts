import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmployeeService} from "../../../service/employee.service";
import {ButtonComponent} from "../../button/button-default/button.component";
import {EmployeeButtonComponent} from "../../button/employee-button/employee-button.component";
import {LogoutComponent} from "../../login/logout/logout.component";
import {NgIf} from "@angular/common";
import {PrimaryInputComponent} from "../../login/primary-input/primary-input.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorHandlerComponent} from "../../error-handler/error-handler.component";

interface DeleteForm {
  name: FormControl<string>;
}

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [
    ButtonComponent,
    EmployeeButtonComponent,
    FormsModule,
    LogoutComponent,
    NgIf,
    PrimaryInputComponent,
    ReactiveFormsModule,
    ErrorHandlerComponent
  ],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css'
})
export class DeleteEmployeeComponent {
  deleteForm!: FormGroup<DeleteForm>;
  successMessage: string | null = null;
  error: HttpErrorResponse | null = null;

  constructor(
    private employeeService: EmployeeService,
  ) {
    this.deleteForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    } as DeleteForm);
  }

  submit() {
    this.successMessage = null;
    this.error = null;
    if (this.deleteForm.valid) {
      this.employeeService.deleteEmployee(
        this.deleteForm.value.name!
      ).subscribe({
        next: () => {
          this.successMessage = 'Exclusão feita com sucesso!';

        },
        error: (error: HttpErrorResponse) => {
          this.error = error;
        }
      });
    }
  }
}
