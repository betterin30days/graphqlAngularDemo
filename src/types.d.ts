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
}

export interface Employee {
  id?: string | null;

  firstName?: string | null;

  lastName?: string | null;

  clients?: (Client | null)[] | null;
}

export interface Client {
  id?: string | null;

  company?: string | null;

  phone?: string | null;

  salesRep?: Employee | null;
}

export interface Mutation {
  addClient?: Client | null;
}

// ====================================================
// Arguments
// ====================================================

export interface AddClientMutationArgs {
  company?: string | null;

  phone?: string | null;

  salesRep?: string | null;
}
