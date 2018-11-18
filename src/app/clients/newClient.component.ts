import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddClientMutation } from '../graphQL/addClientMutation.service';
import { ClientsQuery } from '../graphQL/clientsQuery.service';
import { Client, Employee } from 'src/types';
import { EmployeesQuery } from '../graphQL/employeesQuery.service';

@Component({
  selector: 'app-new-client-component',
  styleUrls: ['../shared.css', './newClient.component.css'],
  templateUrl: './newClient.component.html'
})
export class NewClientComponent {
  public newClientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private addClientMutation: AddClientMutation,
    private clientsQuery: ClientsQuery,
    private employeesQuery: EmployeesQuery
  ) {
    this.createForm();
  }

  public onSubmit(): void {
    const company = this.newClientForm.get('company').value;
    const phone = this.newClientForm.get('phone').value;
    const salesRep = 'e0';
    this.addClient(company, phone, salesRep);
  }

  private createForm(): void {
    this.newClientForm = this.fb.group({
      company: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  private addClient(company, phone, salesRep): void {
    const variables = { company, phone, salesRep};
    this.addClientMutation.mutate(variables, {
      update: (store, { data: { addClient } }) => {
        // clientsQuery
        const data = store.readQuery({ query: this.clientsQuery.document }) as {clients: Client[]};
        data.clients.push(addClient);
        store.writeQuery({ query: this.clientsQuery.document, data });
        // employeesQuery
        const employeeId = addClient.salesRep.id;
        const employeesData = store.readQuery({ query: this.employeesQuery.document }) as {employees: Employee[]};
        const employee = employeesData.employees.find(element => element.id === employeeId);
        employee.clients.push(addClient);
        store.writeQuery({ query: this.employeesQuery.document, data: employeesData });
      }
    }).subscribe();
  }
}
