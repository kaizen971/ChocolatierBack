import mongoose from 'mongoose';
import { sha256 } from '../utils/utils.js';

const RecompenseSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  recompense: { type: [], required: true },
});

RecompenseSchema.static('createRecompense', createRecompense);
RecompenseSchema.static('checkUserCredentials', checkUserCredentials);

async function createRecompense(firstName, lastName, email, recompense) {  
    return await this.create({
      firstName,
      lastName,
      email,
      recompense 
    });
}


async function checkUserCredentials(email, password) {
    const user = await this.findOne({ email, password:  sha256(password) });
  
    if (!user) throw new Error(`Identifiants invalides ou utilisateur inexistant`);
  
    return user;
  }

  const collectionName = 'Recompense';
  export const RecompenseModel = mongoose.model('Recompense', RecompenseSchema, collectionName);