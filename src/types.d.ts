export enum CacheControlScope {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE"
}

/** The `Upload` scalar type represents a file upload promise that resolves an object containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  employees?: (Employee | null)[] | null;

  clients?: (Client | null)[] | null;

  users?: (User | null)[] | null;

  docs?: (Doc | null)[] | null;
}

export interface Employee {
  id: string;

  firstName: string;

  lastName: string;

  clients?: (Client | null)[] | null;
}

export interface Client {
  id: string;

  company: string;

  phone: string;

  salesRep: Employee;
}

export interface User {
  id: string;

  name: string;
}

export interface Doc {
  id: string;

  name: string;
}

export interface Mutation {
  addClient?: Client | null;

  updateClient?: Client | null;
}

// ====================================================
// Arguments
// ====================================================

export interface AddClientMutationArgs {
  company: string;

  phone: string;

  salesRep: string;
}
export interface UpdateClientMutationArgs {
  clientId: string;

  salesRepId: string;
}
