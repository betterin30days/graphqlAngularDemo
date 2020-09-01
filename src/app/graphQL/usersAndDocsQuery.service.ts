import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Doc, User } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class UsersAndDocsQuery extends Query<{users: User[], docs: Doc[]}> {
  document = gql`
    query {
      users {
        id
        name
      }
      docs {
        id
        name
      }
    }
  `;
}
