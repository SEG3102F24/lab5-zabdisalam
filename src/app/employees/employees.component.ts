import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from "../service/employee.service";
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../model/employee';
import { Timestamp } from '@angular/fire/firestore'; // Import Firestore Timestamp

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    standalone: true,
    imports: [RouterLink, NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent implements OnInit {
  protected employeesService: EmployeeService = inject(EmployeeService);
  employees$: Observable<Employee[]> | undefined;

  ngOnInit(): void {
    // Fetch and map Firestore data to convert Timestamp to Date
    this.employees$ = this.employeesService.getEmployees().pipe(
      map(employees => employees.map(employee => ({
        ...employee,
        dateOfBirth: (employee.dateOfBirth instanceof Timestamp) 
          ? employee.dateOfBirth.toDate() // Convert Firestore Timestamp to JavaScript Date
          : employee.dateOfBirth
      })))
    );
  }
}
