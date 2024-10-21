import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Router, RouterLink } from '@angular/router';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
})
export class EmployeeComponent {
  private builder: FormBuilder = inject(FormBuilder);
  private employeeService: EmployeeService = inject(EmployeeService);
  private router: Router = inject(Router);

  employeeForm = this.builder.group({
    name: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    city: ['', Validators.required],
    salary: [0, Validators.required],
    gender: ['', Validators.pattern('^[MFX]$')], // 'MFX' for Male, Female, X (non-binary)
    email: ['', Validators.email],
  });

  get name(): AbstractControl<string> {
    return <AbstractControl<string>>this.employeeForm.get('name');
  }
  get dateOfBirth(): AbstractControl<string> {
    return <AbstractControl<string>>this.employeeForm.get('dateOfBirth');
  }
  get city(): AbstractControl<string> {
    return <AbstractControl<string>>this.employeeForm.get('city');
  }
  get salary(): AbstractControl<number> {
    return <AbstractControl<number>>this.employeeForm.get('salary');
  }
  get gender(): AbstractControl<string> {
    return <AbstractControl<string>>this.employeeForm.get('gender');
  }
  get email(): AbstractControl<string> {
    return <AbstractControl<string>>this.employeeForm.get('email');
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      const employee: Employee = new Employee(
        this.name.value,
        new Date(this.dateOfBirth.value),
        this.city.value,
        this.salary.value,
        this.gender.value,
        this.email.value
      );

      // Convert Employee class instance to a plain object
      const employeeData = {
        name: employee.name,
        dateOfBirth: employee.dateOfBirth,
        city: employee.city,
        salary: employee.salary,
        gender: employee.gender,
        email: employee.email,
      };

      // Add employee to Firestore using EmployeeService
      this.employeeService
        .addEmployee(employeeData)
        .then(() => {
          // Reset form after successful addition
          this.employeeForm.reset();
          // Navigate back to employees list
          this.router.navigate(['/employees']).then(() => {});
        })
        .catch((error) => {
          console.error('Error adding employee:', error);
        });
    }
  }
}
