import {Component} from '@angular/core';
import {ButtonComponent} from "../../button/button-default/button.component";
import {EmployeeButtonComponent} from "../../button/employee-button/employee-button.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LogoutComponent} from "../../login/logout/logout.component";
import {NgIf} from "@angular/common";
import {PrimaryInputComponent} from "../../login/primary-input/primary-input.component";
import {EmployeeService} from "../../../service/employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorHandlerComponent} from "../../error-handler/error-handler.component";

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
    ReactiveFormsModule,
    ErrorHandlerComponent
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  editForm!: FormGroup<EditForm>;
  successMessage: string | null = null;
  error: HttpErrorResponse | null = null;

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
    this.error = null;
    if (this.editForm.valid) {
      this.employeeService.update(
        this.editForm.value.name!,
        this.editForm.value.password!,
        this.editForm.value.role!
      ).subscribe({
        next: () => {
          this.successMessage = 'Alteração feita com sucesso!';

        },
        error: (error: HttpErrorResponse) => {
          this.error = error;
        }
      });
    }
  }
}
