import { Component, OnInit } from '@angular/core';

import { UsersQuery } from '../graphQL/usersQuery.service';
import { DocsQuery } from '../graphQL/docsQuery.service';
import { UsersAndDocsQuery } from '../graphQL/usersAndDocsQuery.service';
import { UpdateDocMutation } from '../graphQL/updateDocMutation.service';
import { Doc, User } from 'src/types';

@Component({
  selector: 'app-users-component',
  template: `<h1>users</h1>`
})
export class UsersComponent implements OnInit {
  public users: User[];
  public docs: Doc[];
  constructor(
    private usersQuery: UsersQuery,
    private docsQuery: DocsQuery,
    private usersAndDocsQuery: UsersAndDocsQuery,
    private updateDocMutation: UpdateDocMutation
  ) {}

  ngOnInit() {
    // this.getUsers();
    // this.getDocs();
    this.getBoth();
    setTimeout(() => this.updateDocName('a', 'bilin'), 3000);
    setTimeout(() => this.getDocs(), 6000);
  }

  private getUsers(): void {
    this.usersQuery.watch().valueChanges.subscribe(result => {
      this.users = result.data.users;
      console.log(this.users);
    });
  }

  private getDocs(): void {
    this.docsQuery.watch().valueChanges.subscribe(result => {
      this.docs = result.data.docs;
      console.log(`getDocs query completed!
        Doc A = { id : ${this.docs[0].id}, name : ${this.docs[0].name} }
      `);
    });
  }

  private getBoth(): void {
    this.usersAndDocsQuery.watch().valueChanges.subscribe(result => {
      this.users = result.data.users;
      this.docs = result.data.docs;
      console.log(`getBoth query completed!
        User A = { id : ${this.users[0].id}, name : ${this.users[0].name} }
        Doc A = { id : ${this.docs[0].id}, name : ${this.docs[0].name} }
      `);
    });
  }

  private updateDocName(id: string, name: string): void {
    this.updateDocMutation.mutate({id, name}).subscribe(result => {
      console.log(`updateDoc mutation completed!
        User A = { id : ${this.users[0].id}, name : ${this.users[0].name} }
        Doc A = { id : ${this.docs[0].id}, name : ${this.docs[0].name} }
      `);
    });
  }
}
