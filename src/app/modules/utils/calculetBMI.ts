export const calculateBMI = (hight: string, weight: string) => {
  const numberHight = parseFloat(hight);
  const numberWeight = parseFloat(weight);

  const bmi = numberWeight / (numberHight * 2);
  const BMICalculation = bmi.toFixed(2);
  const BMI = BMICalculation.toString();

  return BMI;
};
