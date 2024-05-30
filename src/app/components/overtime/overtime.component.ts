import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../button/button.component";
import {Router} from "@angular/router";
import {RecordWorkTime} from "../../model/RecordWorkTime";
import {HttpErrorResponse} from "@angular/common/http";
import {RecordWorkTimeService} from "../../service/record-work-time.service";
import {RecordWorkTimeModule} from "../../../module/record-work-time.module";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {LogoutComponent} from "../logout/logout.component";
import {BackButtonComponent} from "../button/back-button/back-button.component";


@Component({
  selector: 'app-overtime',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    RecordWorkTimeModule,
    DatePipe,
    NgForOf,
    NgIf,
    LogoutComponent,
    BackButtonComponent,

  ],
  templateUrl: './overtime.component.html',
  styleUrl: './overtime.component.css'
})
export class OvertimeComponent {

  username: string = '';
  startDate: Date = new Date();
  endDate: Date = new Date();
  linkUrlRegistros: string = '/registros';
  records: RecordWorkTime[] = [];
  totalOvertime: string='';

  constructor(private recordWorkTimeService: RecordWorkTimeService, private router: Router) {
  }

  public searchByOvertime(): void {
    if (this.startDate && this.endDate && this.username) {
      const startDateString = this.startDate.toString().split('T')[0];
      const endDateString = this.endDate.toString().split('T')[0];
      this.recordWorkTimeService.calculateOvertimeByDateRange(this.username, startDateString, endDateString)
        .subscribe(
          (response: { totalOvertime: string }) => {
            this.totalOvertime = response.totalOvertime;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  protected readonly dateTimestampProvider = dateTimestampProvider;
  protected readonly DatePipe = DatePipe;
}
