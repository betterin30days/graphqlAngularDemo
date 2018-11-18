import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Client } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class AddClientMutation extends Mutation<{client: Client}> {
  document = gql`
    mutation addClient (
      $company: String
      $phone: String
      $salesRep: String
    ) {
      addClient(company: $company, phone: $phone, salesRep: $salesRep) {
        id
        company
        phone
        salesRep {
          id
          firstName
          lastName
        }
      }
    }
  `;
}
