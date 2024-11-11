interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseValues {
  trainings: number[],
  target: number
}

const ratingDescriptions = [
  'you need to buck up',
  'not too bad but could be better',
  'way to go!'
];

export const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) {
    throw new Error('Too little arguments');
  }

  args.slice(2).forEach(arg => {
    if (isNaN(Number(arg))) {
      throw new Error('Provided values were not numbers');
    }
  })

  const trainings = args.slice(2, args.length - 1).map(arg => Number(arg));
  const target = Number(args[args.length - 1]);

  return {
    trainings,
    target
  };
}

const calculateExercises = (trainings: number[], target: number): Result => {
  const totalHoursSpentTraining = trainings.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0
  );
  const numOfTrainingDays = trainings.reduce(
    (accumulator, currentValue) => (currentValue !== 0 ? accumulator + 1 : accumulator), 0
  );
  const averageTrainingHours = totalHoursSpentTraining / trainings.length;
  const targetMet = averageTrainingHours >= target ? true : false;
  
  let rating = 1;
  let ratingDescription = ratingDescriptions[0];

  if (targetMet) {
    rating = 3;
    ratingDescription = ratingDescriptions[2];
  } else if (averageTrainingHours > 0.5 * target) {
    rating = 2;
    ratingDescription = ratingDescriptions[1];
  }
    
  return {
    periodLength: trainings.length,
    trainingDays: numOfTrainingDays,
    success: targetMet,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: averageTrainingHours
  };
}

try {
  const { trainings, target } = parseArguments(process.argv);
  console.log(calculateExercises(trainings, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}