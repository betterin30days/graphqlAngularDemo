import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { Doc } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class DocsQuery extends Query<{docs: Doc[]}> {
  document = gql`
    query {
      docs {
        id
        name
      }
    }
  `;
}
