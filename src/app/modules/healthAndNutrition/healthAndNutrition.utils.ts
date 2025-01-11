export const calculateCalories = (
  currentWeight: number,
  targetWeight: number,
  durationInDays: number,
  maintenanceCalories: number,
) => {
  const caloriePerKg = 7700; // Calories required to gain/lose 1 kg

  // Calculate the weight difference
  const weightDifference = targetWeight - currentWeight;

  let dailyCalories: number;
  let totalConsumedCalories: number;

  if (weightDifference > 0) {
    // Weight Gain Scenario
    const totalCaloriesToGain = weightDifference * caloriePerKg;
    dailyCalories = totalCaloriesToGain / durationInDays;
    totalConsumedCalories =
      (maintenanceCalories + dailyCalories) * durationInDays;

    return {
      type: `you need to gain weight daily consume Calories ${dailyCalories} in total ${durationInDays}s consume Calories ${totalConsumedCalories}`,
      dailyCalories,
      totalConsumedCalories,
    };
  } else if (weightDifference < 0) {
    // Weight Loss Scenario
    const totalCaloriesToLose = Math.abs(weightDifference) * caloriePerKg;
    dailyCalories = totalCaloriesToLose / durationInDays;
    totalConsumedCalories =
      (maintenanceCalories - dailyCalories) * durationInDays;

    return {
      type: `you need to loss weight daily consume Calories ${dailyCalories} in total ${durationInDays}s consume Calories ${totalConsumedCalories}`,
      dailyCalories,
      totalConsumedCalories,
    };
  } else {
    // No Change in Weight (maintenance scenario)
    return {
      type: 'no-change',
      dailyCalories: 0,
      totalConsumedCalories: maintenanceCalories * durationInDays,
    };
  }
};

//   // Example usage:
//   const currentWeight = 75; // user's current weight in kg
//   const targetWeight = 70;  // user's target weight in kg
//   const durationInDays = 30; // duration in days
//   const maintenanceCalories = 2500; // Maintenance calories (based on user's activity level, etc.)

//   const result = calculateCalories(currentWeight, targetWeight, durationInDays, maintenanceCalories);
//   console.log(result);
