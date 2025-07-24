import { expressionTokenizer, expressionValidator, infixToPostfix } from './expression-eval';

for (const expression of [
  '=2+3',
  '=2*(3+4)',
  '=2+3*4',
  '=A1+B2*(C3/E4)*23.34',
  //'=A23.34',
]) {
  if (expressionValidator(expression)) {
    console.log([
      ...infixToPostfix(expressionTokenizer(expression)),
    ]);
  } else {
    console.log(`Expression "${expression}" is invalid`);
  }
}
