export type SpecifiedCursor = {
  id?: string | null;
};

export type ConnectionCursor = string;

export interface SpecifiedArguments {
  before?: SpecifiedCursor | null;
  after?: SpecifiedCursor | null;
  first?: number | null;
  last?: number | null;
}

export interface ConnectionArguments {
  from?: number | null;
  size?: number | null;
}

export interface Edge<T> {
  node: T;
  cursor: ConnectionCursor;
}

export interface Connection<T> {
  nodes: Array<T>;
  totalCount: number;
}
