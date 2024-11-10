const calculateBmi = (height: number, weight: number): string => {
  if (height < 0 || weight < 0)
    return 'Invalid weight/height given!'

  const heightInMetres = height / 100
  const bmi = weight / Math.pow(heightInMetres, 2)

  if (bmi < 18.5)
    return 'Underweight range'
  else if (bmi >= 18.5 && bmi < 25)
    return 'Normal range'
  else if (bmi >= 25 && bmi < 30)
    return 'Overweight range'
  else if (bmi > 30)
    return 'Obese range'
}

console.log(calculateBmi(180, 74))