import { Component, OnInit } from '@angular/core';

import { EmployeesQuery } from '../graphQL/employeesQuery.service';
import { Employee } from 'src/types';

@Component({
  selector: 'app-employees-component',
  styleUrls: ['../shared.css', './employees.component.css'],
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  public employees: Employee[];
  constructor(private employeesQuery: EmployeesQuery) {}

  ngOnInit() {
    this.employeesQuery.watch().valueChanges.subscribe(result => {
      this.employees = result.data.employees;
    });
  }
}
