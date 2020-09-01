import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';
import { Doc } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class UpdateDocMutation extends Mutation<{doc: Doc}> {
  document = gql`
    mutation updateDoc (
      $id: String!
      $name: String!
    ) {
      updateDoc(id: $id, name: $name) {
        id
        name
      }
    }
  `;
}
