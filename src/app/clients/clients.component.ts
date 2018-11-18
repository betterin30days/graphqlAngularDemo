import { Component, OnInit } from '@angular/core';

import { ClientsQuery } from '../graphQL/clientsQuery.service';
import { Client } from 'src/types';

@Component({
  selector: 'app-clients-component',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {
  public clients: Client[];
  constructor(private clientsQuery: ClientsQuery) {}

  ngOnInit() {
    this.clientsQuery.watch().valueChanges.subscribe(result => {
      this.clients = result.data.clients;
    });
  }
}
