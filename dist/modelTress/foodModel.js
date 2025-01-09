"use strict";
// Predefined dataset with nutritional information per gram for each food item
const nutritionDatabase = {
    apple: { carbohydrates: 0.14, fats: 0.002, proteins: 0.003, calories: 0.52 },
    banana: { carbohydrates: 0.23, fats: 0.003, proteins: 0.011, calories: 0.96 },
    'chicken breast': {
        carbohydrates: 0.0,
        fats: 0.036,
        proteins: 0.31,
        calories: 1.65,
    },
    'whole wheat bread': {
        carbohydrates: 0.49,
        fats: 0.025,
        proteins: 0.09,
        calories: 2.5,
    },
    almonds: { carbohydrates: 0.22, fats: 0.5, proteins: 0.21, calories: 5.76 },
    broccoli: {
        carbohydrates: 0.07,
        fats: 0.001,
        proteins: 0.028,
        calories: 0.34,
    },
    'cooked white rice': {
        carbohydrates: 0.28,
        fats: 0.003,
        proteins: 0.026,
        calories: 1.3,
    },
    'olive oil': { carbohydrates: 0.0, fats: 1.0, proteins: 0.0, calories: 9.0 },
    salmon: { carbohydrates: 0.0, fats: 0.13, proteins: 0.2, calories: 2.08 },
    egg: { carbohydrates: 0.01, fats: 0.1, proteins: 0.13, calories: 1.43 },
    // Add more food items as needed
};
// Function to calculate total nutritional intake
function calculateTotalIntake(consumedFoods) {
    // Initialize totals
    let totalCarbohydrates = 0;
    let totalFats = 0;
    let totalProteins = 0;
    let totalCalories = 0;
    // Iterate over each consumed food item
    for (const item of consumedFoods) {
        const { foodName, grams } = item;
        const nutrition = nutritionDatabase[foodName.toLowerCase()];
        if (nutrition) {
            // Calculate and accumulate the nutrients based on the weight consumed
            totalCarbohydrates += nutrition.carbohydrates * grams;
            totalFats += nutrition.fats * grams;
            totalProteins += nutrition.proteins * grams;
            totalCalories += nutrition.calories * grams;
        }
        else {
            // console.warn(Nutritional information for '${foodName}' not found.);
            console.log(`Nutritional information for '${foodName}' not found.`);
        }
    }
    // Return the total nutritional intake
    return {
        carbohydrates: totalCarbohydrates,
        fats: totalFats,
        proteins: totalProteins,
        calories: totalCalories,
    };
}
// Example usage
// when we return the food info this time
const consumedFoods = [
    { foodName: 'Apple', grams: 150 },
    { foodName: 'Banana', grams: 120 },
    { foodName: 'Chicken Breast', grams: 200 },
];
const totalIntake = calculateTotalIntake(consumedFoods);
console.log('Total Nutritional Intake:', totalIntake);
