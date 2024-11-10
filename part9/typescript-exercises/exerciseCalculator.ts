interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const ratingDescriptions = [
  'you need to buck up',
  'not too bad but could be better',
  'way to go!'
];

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

console.log(calculateExercises([4, 0, 2, 3.5, 0, 5, 1], 2));