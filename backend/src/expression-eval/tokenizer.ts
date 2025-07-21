const TOKEN_REGEX = /[A-Z][0-9]+|\d+(\.\d+)?|[+\-*/()]/g;

export function *expressionTokenizer(e: string) {
  for (const token of e.matchAll(TOKEN_REGEX)) {
    yield token[0];
  }
}
