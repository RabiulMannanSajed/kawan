import { Health } from '../healthAndNutrition/healthAndNutrition.model';
import { calculateBMI } from '../utils/calculetBMI';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};

// TODO return here next
const updateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  if (payload.hight && typeof payload.hight !== 'string') {
    throw new Error('Hight must be a string.');
  }
  if (payload.weight && typeof payload.weight !== 'string') {
    throw new Error('Weight must be a string.');
  }

  // Update the user record
  const updatedUser = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true, // Return the updated user document
  });

  if (!updatedUser) {
    throw new Error('User not found.');
  }

  // Check if `hight` or `weight` was updated
  if (payload.hight || payload.weight) {
    try {
      // Find associated health records
      const healthRecords = await Health.find({ user: id });

      for (const health of healthRecords) {
        const hight = updatedUser.hight; // Fetch the updated height
        const weight = updatedUser.weight; // Fetch the updated weight

        if (!hight || !weight) {
          throw new Error('User height or weight is missing');
        }

        health.BMI = calculateBMI(hight, weight);
        health.hight = hight;
        health.weight = weight;

        await health.save(); // Save changes
      }
    } catch (error) {
      throw new Error('Failed to update associated health records.');
    }
  }

  return updatedUser;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  updateUserIntoDB,
};
