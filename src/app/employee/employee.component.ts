import {Component, inject} from '@angular/core';
import { AbstractControl, FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import {EmployeeService} from "../service/employee.service";
import { Router, RouterLink } from "@angular/router";
import {Employee} from "../model/employee";
import { Firestore, collection, addDoc } from 'firebase/firestore';
import { db } from '../app.config'; // Import Firestore instance

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css'],
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule]
})
export class EmployeeComponent {
  private builder: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);
  private router: Router = inject(Router);
  private firestore: Firestore = inject(Firestore); // Inject Firestore
  
  employeeForm = this.builder.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    city: ['', Validators.required],
    salary: [0, Validators.required],
    gender: ['', Validators.pattern('^[MFX]$')],
    email: ['', Validators.email]
  });

  get name(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('name'); }
  get dateOfBirth(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('dateOfBirth'); }
  get city(): AbstractControl { return <AbstractControl>this.employeeForm.get('city'); }
  get salary(): AbstractControl<number> { return <AbstractControl<number>>this.employeeForm.get('salary'); }
  get gender(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('gender'); }
  get email(): AbstractControl<string> { return <AbstractControl<string>>this.employeeForm.get('email'); }

  async onSubmit() {
    const employee: Employee = new Employee(this.name.value,
      new Date(this.dateOfBirth.value),
      this.city.value,
      this.salary.value,
      this.gender.value,
      this.email.value);

    // Save employee to Firestore
    try {
      const employeeCollection = collection(db, 'employees');
      await addDoc(employeeCollection, {
        name: this.name.value,
        dateOfBirth: this.dateOfBirth.value,
        city: this.city.value,
        salary: this.salary.value,
        gender: this.gender.value,
        email: this.email.value
      });
      alert('Employee added to Firestore!');
    } catch (error) {
      console.error('Error adding employee to Firestore: ', error);
    }

    // Call the existing service method to add employee locally
    this.employeeService.addEmployee(employee);
    this.employeeForm.reset();
    this.router.navigate(['/employees']).then(() => {});
  }
}
