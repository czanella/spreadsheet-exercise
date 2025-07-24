import { Operation } from './types';
import { variableValidator } from './validators';

const BINARY_OPERATIONS: Record<string, Operation> = {
  '+': {
    f: (x, y) => x + y,
    arguments: 2,
    precedence: 1,
  },
  '-': {
    f: (x, y) => x - y,
    arguments: 2,
    precedence: 1,
  },
  '*': {
    f: (x, y) => x * y,
    arguments: 2,
    precedence: 2,
  },
  '/': {
    f: (x, y) => x / y,
    arguments: 2,
    precedence: 2,
  },
  '%': {
    f: (x, y) => x % y,
    arguments: 2,
    precedence: 2,
  },
  '^': {
    f: (x, y) => Math.pow(x, y),
    arguments: 2,
    precedence: 3,
  },
};

const UNARY_OPERATIONS: Record<string, Operation> = {
  '-': {
    f: x => -x,
    arguments: 1,
    precedence: 4,
  }
};

export function *infixToPostfix(tokens: Iterable<string>) {
  let consumedNumber = false;
  let operationStack: Operation[] = [];

  for (const token of tokens) {
    // If token is a number, send it to output
    const value = parseFloat(token);
    if (!isNaN(value)) {
      yield value;
      consumedNumber = true;
      continue;
    }

    // If it's a variable, also send it to output
    if (variableValidator(token)) {
      yield token;
      consumedNumber = true;
      continue;
    }

    // Token is an operation, so let's process it
    let operation: Operation;
    const expectedOperations = consumedNumber ? BINARY_OPERATIONS : UNARY_OPERATIONS;

    if (!(token in expectedOperations)) {
      throw new Error(`Unexpected token: ${token}`);
    }
    operation = expectedOperations[token];

    while (
      operationStack.length > 0 &&
      operation.precedence < operationStack[operationStack.length - 1].precedence
    ) {
      yield operationStack.pop();
    }
    operationStack.push(operation);
    consumedNumber = false;
  }

  while(operationStack.length > 0) {
    yield operationStack.pop();
  }
}
