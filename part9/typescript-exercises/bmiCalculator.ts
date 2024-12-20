interface BmiValues {
  height: number,
  weight: number
}

export const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) {
    throw new Error('Too little arguments');
  } else if (args.length > 4) {
    throw new Error('Too many arguments');
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  if (height < 0 || weight < 0)
    return 'Invalid weight/height given!';

  const heightInMetres = height / 100;
  const bmi = weight / Math.pow(heightInMetres, 2);

  if (bmi < 18.5)
    return 'Underweight range';
  else if (bmi >= 18.5 && bmi < 25)
    return 'Normal range';
  else if (bmi >= 25 && bmi < 30)
    return 'Overweight range';
  
  return 'Obese range';
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;