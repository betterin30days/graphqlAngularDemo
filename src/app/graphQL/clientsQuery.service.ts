import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Client } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class ClientsQuery extends Query<{clients: Client[]}> {
  document = gql`
    query {
      clients {
        company
        phone
        salesRep {
          firstName
        }
      }
    }
  `;
}
