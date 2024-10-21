import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<readonly Employee[]>([]);

  // Map the readonly Employee[] to a mutable Employee[]
  get $(): Observable<Employee[]> {
    return this.employees$.asObservable().pipe(
      map(employees => [...employees]) // Convert readonly array to mutable
    );
  }

  addEmployee(employee: Employee) {
    this.employees$.next([...this.employees$.getValue(), employee]);
    return true;
  }
}
