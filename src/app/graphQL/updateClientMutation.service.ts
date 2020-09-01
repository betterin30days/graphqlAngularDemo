import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Client } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class UpdateClientMutation extends Mutation<{client: Client}> {
  document = gql`
    mutation updateClient (
      $clientId: String!
      $salesRepId: String!
    ) {
      updateClient(clientId: $clientId, salesRepId: $salesRepId) {
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
