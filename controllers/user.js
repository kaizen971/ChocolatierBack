import { UserModel } from '../Models/User.js';
import {RecompenseModel} from '../Models/Recompense.js'

export async function CreateUserController(req, res) {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;
  let status = "client"
  try {
    const newUser = await UserModel.createUser(firstName, lastName, email, password, passwordConfirm,status);

    res.status(200).send("Inscription réussie");
    const loggedUser = await UserModel.checkUserCredentials(email, password);

    // Saves user in session
    req.session.user = loggedUser;
    
  } catch ({ message: errorMessage }) {
    return res.status(400).send({ errorMessage, values: req.body });
  }
}

export async function LoginUserController(req, res) {
  const { email, password } = req.body;
 
  try {
    const loggedUser = await UserModel.checkUserCredentials(email, password);
    // Saves user in session
    req.session.user = loggedUser;
    return res.status(200).send("connexion reussie");
  } catch (error) {

    return res.status(400).send(`failed login ${error}`);
  }
}


export async function UserController(req,res){
  return res.status(200).send("Authentification réussie");
}