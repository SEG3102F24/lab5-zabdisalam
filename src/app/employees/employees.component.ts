import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from "../service/employee.service";
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { Firestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../app.config'; // Import Firestore instance
import { Observable } from 'rxjs';
import { Employee } from '../model/employee'; // Import Employee model

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent implements OnInit {
  protected employeesFromService: EmployeeService = inject(EmployeeService); // Old service
  employees$: Observable<readonly Employee[]> = this.employeesFromService.employees$; // Align type to readonly Employee[]
  employeesFromFirestore: any[] = []; // New Firestore employee data

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    // Fetch employees from Firestore
    try {
      const employeeCollection = collection(db, 'employees');
      const employeeSnapshot = await getDocs(employeeCollection);
      this.employeesFromFirestore = employeeSnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.error('Error fetching employees from Firestore: ', error);
    }
  }
}
