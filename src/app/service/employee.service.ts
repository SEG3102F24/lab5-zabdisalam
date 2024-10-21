import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, updateDoc, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee'; // Ensure the correct path to your model

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  // Get all employees from Firestore
  getEmployees(): Observable<Employee[]> {
    const employeesRef = collection(this.firestore, 'employees'); // 'employees' is the Firestore collection
    return collectionData(employeesRef, { idField: 'id' }) as Observable<Employee[]>;
  }

  // Add a new employee to Firestore
  addEmployee(employee: Employee): Promise<void> {
    const employeesRef = collection(this.firestore, 'employees');
    return addDoc(employeesRef, employee).then(() => {});
  }

  // Update an existing employee in Firestore
  updateEmployee(employeeId: string, employee: Employee): Promise<void> {
    const employeeDocRef = doc(this.firestore, `employees/${employeeId}`);
    return updateDoc(employeeDocRef, { ...employee });
  }

  // Delete an employee from Firestore
  deleteEmployee(employeeId: string): Promise<void> {
    const employeeDocRef = doc(this.firestore, `employees/${employeeId}`);
    return deleteDoc(employeeDocRef);
  }
}
