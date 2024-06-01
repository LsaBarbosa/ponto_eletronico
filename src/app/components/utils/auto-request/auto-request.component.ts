import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription, switchMap} from "rxjs";
import {EmployeeService} from "../../../service/employee.service";

@Component({
  selector: 'app-auto-request',
  standalone: true,
  imports: [],
  templateUrl: './auto-request.component.html',
  styleUrl: './auto-request.component.css'
})
export class AutoRequestComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(private dataService: EmployeeService) {
  }

  ngOnInit() {
    // Cria um observable que emite valores a cada 5 minutos (300000 milissegundos)
    this.subscription = interval(300000).pipe(
      switchMap(() => this.dataService.getData())
    ).subscribe();
  }

  ngOnDestroy() {
    // Cancela a assinatura quando o componente for destruído
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
