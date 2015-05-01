declare module HighlightJS{
  export interface HighlightPublic{
    initHighlighting:Function;
  }
}

declare var highlight: HighlightJS.HighlightPublic;

declare module "highlight" {
  export = highlight;
}