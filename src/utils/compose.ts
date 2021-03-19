export const compose = (...funcs: Function[]): Function =>
  (acc: any): any =>
    funcs.reduceRight((acc, f) => f(acc), acc);
