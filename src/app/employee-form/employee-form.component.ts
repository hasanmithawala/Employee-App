import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  styleUrls: ['./employee-form.component.css'],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  departments: any[] = [];
  designations: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  employees: any[] = [];

  submitted = false;
  constructor(public fb: FormBuilder, public dataService: DataService) {
    this.employeeForm = this.fb.group({
      employeeCode: [
        '',
        [Validators.required, Validators.pattern(/^emp\d{3}$/)],
      ],
      employeeName: ['', Validators.required],
      department: ['', Validators.required],
      designation: [{ value: '', disabled: true }, Validators.required],
      dob: ['', [Validators.required, this.validateDateOfBirth.bind(this)]],
      doj: ['', [Validators.required, this.validateDateOfJoin.bind(this)]],
      state: ['', Validators.required],
      city: [{ value: '', disabled: true }, Validators.required],
    });
  }
  ngOnInit(): void {
    this.dataService.getDepartments().subscribe((departments) => {
      this.departments = departments;
    });

    this.dataService.getStates().subscribe((states) => {
      this.states = states;
    });
    this.dataService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  onDepartmentChange(): void {
    const selectedDepartmentId = this.employeeForm.get('department')?.value;
    if (selectedDepartmentId) {
      this.employeeForm.get('designation')?.enable();
    } else {
      this.employeeForm.get('designation')?.disable();
    }
    this.dataService
      .getDesignationsByDepartmentName(selectedDepartmentId)
      .subscribe((designations) => {
        this.designations = designations;
        this.employeeForm.get('designation')?.setValue('');
      });
  }

  onStateChange(): void {
    const selectedStateId = this.employeeForm.get('state')?.value;
    if (selectedStateId) {
      this.employeeForm.get('city')?.enable();
    } else {
      this.employeeForm.get('city')?.disable();
    }
    this.dataService.getCitiesByStateId(selectedStateId).subscribe((cities) => {
      const uniqueCities = Array.from(
        new Set(cities.map((city: any) => city.CT))
      );
      this.cities = uniqueCities;
      this.employeeForm.get('city')?.setValue('');
    });
  }
  validateDateOfBirth(control: any): { [key: string]: boolean } | null {
    // to check date selected by the user shouldn't be in future
    const today = new Date();
    const selectedDate = new Date(control.value);
    if (selectedDate > today) {
      this.employeeForm.get('doj')?.disable();
      return { dateInFuture: true };
    } else {
      this.employeeForm?.get('doj')?.enable();
      return null;
    }
  }
  validateDateOfJoin(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    // validating dateofjoin using dateofbirth value's that is selected by user from dropdown
    const dobControl = this.employeeForm?.get('dob');
    if (!dobControl?.value) {
      this.employeeForm?.get('doj')?.disable();
      return null;
    }

    const dob = new Date(dobControl.value);
    const doj = new Date(control.value);

    const ageInMilliseconds = doj.getTime() - dob.getTime();
    const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000);

    if (ageInYears < 18) {
      return { ageLessThan18: true };
    }

    return null;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.employeeForm.valid) {
      const formData = { ...this.employeeForm.value };
      // removing space from employeename and then storing  the data in mongodb
      formData.employeeName = formData.employeeName.replace(/\s/g, '');
      // converting the dateofbirth in a format that is accepted by mongodb
      formData.dob = new Date(
        this.employeeForm.get('dob')?.value
      ).toISOString();
      formData.doj = new Date(
        this.employeeForm.get('doj')?.value
      ).toISOString();
      this.dataService.addEmployee(formData).subscribe(
        (response) => {
          alert('Employee Added Successfully');
          // reseting the form to its default value
          this.employeeForm.reset({
            employeeCode: '',
            employeeName: '',
            department: '',
            designation: { value: '', disabled: true },
            dob: '',
            doj: '',
            state: '',
            city: { value: '', disabled: true },
          });
        },
        (error) => {
          if (error.error && error.error.error) {
            alert(error.error.error);
          } else {
            alert('An unexpected error occurred.');
          }
        }
      );
    } else {
      // code for showing validation errros when user tries to submit the form without any value in input field
      Object.keys(this.employeeForm.controls).forEach((field) => {
        const control = this.employeeForm.get(field);
        control!.markAsTouched({ onlySelf: true });
      });
    }
  }
}
