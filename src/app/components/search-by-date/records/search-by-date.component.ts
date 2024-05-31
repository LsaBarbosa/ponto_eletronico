import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../button/button-default/button.component";
import {Router} from "@angular/router";
import {RecordWorkTime} from "../../../model/RecordWorkTime";
import {HttpErrorResponse} from "@angular/common/http";
import {RecordWorkTimeService} from "../../../service/record-work-time.service";
import {RecordWorkTimeModule} from "../../../../module/record-work-time.module";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {BackButtonComponent} from "../../button/back-button/back-button.component";
import {ErrorHandlerComponent} from "../../error-handler/error-handler.component";

@Component({
  selector: 'app-search-by-date',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    RecordWorkTimeModule,
    DatePipe,
    NgForOf,
    NgIf,
    BackButtonComponent,
    ErrorHandlerComponent,

  ],
  templateUrl: './search-by-date.component.html',
  styleUrl: './search-by-date.component.css'
})
export class SearchByDateComponent {
  username: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  linkUrlRegistros: string = '/registros';
  records: RecordWorkTime[] = [];
  searchPerformed: boolean = false;
  error: HttpErrorResponse | null = null;

  constructor(private recordWorkTimeService: RecordWorkTimeService, private router: Router) {}

  public searchByDate(): void {
    if (this.startDate && this.endDate && this.username) {
      const startDateString = this.startDate.toString().split('T')[0];
      const endDateString = this.endDate.toString().split('T')[0];

      this.recordWorkTimeService.searchRecordsByDateRange(this.username, startDateString, endDateString)
        .subscribe({
          next: (records: RecordWorkTime[]) => {
            this.records = records;
            this.searchPerformed = true;
            this.error = null;
          },
          error: (error: HttpErrorResponse) => {
            this.searchPerformed = false;
            this.error = error;
          }
        });
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }
}
