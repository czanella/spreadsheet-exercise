type UnaryOperation = {
  f: (x: number) => number;
  arguments: 1;
};

type BinaryOperation = {
  f: (x: number, y: number) => number;
  arguments: 2;
};

export type Operation = (UnaryOperation | BinaryOperation) & {
  precedence: number;
};
