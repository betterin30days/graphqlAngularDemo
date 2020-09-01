import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ClientsQuery } from '../graphQL/clientsQuery.service';
import { Client, Employee } from 'src/types';
import { EmployeesQuery } from '../graphQL/employeesQuery.service';
import { UpdateClientMutation } from '../graphQL/updateClientMutation.service';

@Component({
  selector: 'app-update-client-component',
  styleUrls: ['../shared.css', './newClient.component.css'],
  templateUrl: './updateClientComponent.html'
})
export class UpdateClientComponent implements OnInit {
  public employees: Employee[];
  public clients: Client[];
  public updateClientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientsQuery: ClientsQuery,
    private employeesQuery: EmployeesQuery,
    private updateClientMutation: UpdateClientMutation
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.employeesQuery.watch().valueChanges.subscribe(result => {
      this.employees = result.data.employees;
    });
    this.clientsQuery.watch().valueChanges.subscribe(result => {
      this.clients = result.data.clients;
    });
  }

  private createForm(): void {
    this.updateClientForm = this.fb.group({
      client: ['', Validators.required],
      salesRep: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const client = this.updateClientForm.get('client').value;
    const salesRep = this.updateClientForm.get('salesRep').value;
    this.updateClient(client, salesRep);
    this.updateClientForm.reset();
  }

  private updateClient(clientId: Client, salesRepId: Employee): void {
    const variables = { clientId, salesRepId };
    this.updateClientMutation.mutate(variables).subscribe(
      x => console.log(x),
      y => console.log(y)
    );
  }
}
