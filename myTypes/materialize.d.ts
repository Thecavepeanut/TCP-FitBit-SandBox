declare module Materialize{
  export interface MaterializeExports{
  }
}

declare var materialize: Materialize.MaterializeExports;

declare module "materialize" {
  export = materialize;
}