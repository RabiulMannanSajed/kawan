export const calculateBMI = (hight: string, weight: string) => {
  const bmi = weight / (hight * 2); // number
  const BMICalculation = bmi.toFixed(2);
  const BMI = BMICalculation.toString();

  return BMI;
};
