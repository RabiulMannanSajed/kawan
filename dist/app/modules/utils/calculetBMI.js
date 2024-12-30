"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBMI = void 0;
const calculateBMI = (hight, weight) => {
    const bmi = weight / (hight * 2); // number
    const BMICalculation = bmi.toFixed(2);
    const BMI = BMICalculation.toString();
    return BMI;
};
exports.calculateBMI = calculateBMI;
