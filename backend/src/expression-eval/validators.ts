const VARIABLE_REGEX = /^[A-Z][0-9]+$/;

export function variableValidator(e: string) {
  return VARIABLE_REGEX.test(e);
}

const EXPRESSION_REGEX = /^\s*=\s*((\b[A-Z][0-9]+\b|\b[0-9]+(\.[0-9]+)?\b|[+\-*/()])\s*)+\s*$/;

export function expressionValidator(e: string) {
  return EXPRESSION_REGEX.test(e);
}
