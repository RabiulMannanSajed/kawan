import mongoose from 'mongoose';
import { User } from '../user/user.model';
import { THealth } from './healthAndNutrition.interface';
import { Health } from './healthAndNutrition.model';
import { string } from 'zod';

const createHealthIntoDB = async (payload: THealth) => {
  const result = await Health.create(payload);
  return result;
};

const getAllHealthFromDB = async () => {
  const result = await Health.find().populate('user');
  return result;
};

const getSingleHealthFormDB = async (id: string) => {
  const result = await Health.findById(id);
  return result;
};

const updateHealthIntoDB = async (id: string, payload: Partial<THealth>) => {
  if (payload.hight && typeof payload.hight !== 'string') {
    throw new Error('Hight must be a string.');
  }
  if (payload.weight && typeof payload.weight !== 'string') {
    throw new Error('weight must be a string.');
  }
  if (payload.fitnessLevel && typeof payload.fitnessLevel !== 'string') {
    throw new Error('weight must be a string.');
  }
  console.log(payload);
  const updatedHealth = await Health.findOneAndUpdate({ _id: id }, payload, {
    new: true, // Return the updated user document
  });

  // * clg of the user health
  console.log('payload', payload);

  if (!updatedHealth) {
    throw new Error('health not updated');
  }
  //TODO : when this health will update the hight and weight data then also update in the User collection
  //! this function is not working
  if (payload.hight || payload.weight) {
    try {
      const UserRecord = await User.find({ user: updatedHealth.user });
      if (!UserRecord) {
        console.log('user dose not exists');
      }
      for (const userInfo of UserRecord) {
        const hight = updatedHealth.hight;
        const weight = updatedHealth.weight;

        userInfo.hight = hight;
        userInfo.weight = weight;
        console.log('userinfo', userInfo);
        await userInfo.save();
      }
    } catch (error) {
      throw new Error('Failed to update associated User records.');
    }
  }
  console.log('updatedHealth', updatedHealth);

  return updatedHealth;
};

export const HealthServices = {
  createHealthIntoDB,
  getAllHealthFromDB,
  getSingleHealthFormDB,
  updateHealthIntoDB,
};
