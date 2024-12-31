"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBMI = void 0;
const calculateBMI = (hight, weight) => {
    const numberHight = parseFloat(hight);
    const numberWeight = parseFloat(weight);
    const bmi = numberWeight / (numberHight * 2);
    const BMICalculation = bmi.toFixed(2);
    const BMI = BMICalculation.toString();
    return BMI;
};
exports.calculateBMI = calculateBMI;
