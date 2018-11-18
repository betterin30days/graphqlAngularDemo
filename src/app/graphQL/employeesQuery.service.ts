import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Employee } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class EmployeesQuery extends Query<{employees: Employee[]}> {
  document = gql`
    query {
      employees {
        firstName
        lastName
        clients {
          company
        }
      }
    }
  `;
}
