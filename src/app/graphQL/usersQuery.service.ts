import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class UsersQuery extends Query<{users: User[]}> {
  document = gql`
    query {
      users {
        id
        name
      }
    }
  `;
}
