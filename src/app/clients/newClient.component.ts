import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AddClientMutation } from '../graphQL/addClientMutation.service';
import { ClientsQuery } from '../graphQL/clientsQuery.service';
import { Client } from 'src/types';

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
    private clientsQuery: ClientsQuery
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
        console.log(addClient);
        const data = store.readQuery({ query: this.clientsQuery.document }) as {clients: Client[]};
        data.clients.push(addClient);
        store.writeQuery({ query: this.clientsQuery.document, data });
      }
    }).subscribe(result => console.log(result));
  }
}
