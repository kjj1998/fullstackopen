type Operation = 'multiply' | 'add' | 'subtract' | 'divide';

export const calculator = (a: number, b: number, op: Operation): number => {
  switch(op) {
    case 'multiply':
      return a * b;
    case 'subtract':
      return a - b;
    case 'add':
      return a + b;
    case 'divide': {
      if (b === 0)
        throw new Error('Can\'t divide by zero');
      return a / b;
    }
    default:
      throw new Error('Operation is not multiply, add, subtract or divide!');
  }
};

try {
  console.log(calculator(1, 5, 'divide'));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}