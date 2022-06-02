import {StockModel} from '../Models/Stock.js'
import { RecompenseModel } from '../Models/Recompense.js';

export async function InitStock(req, res) {
   var patries = [
        { "name" : "Fondant supreme" , "number" : 10, "order" : 1 },
        { "name" : "Cake tout Chocolat", "number" : 10,  "order" : 2},
        { "name" : "Cake Framboise chocolat", "number" : 10, "order" : 3},
        { "name" : "Brioche sucrée avec chocolat", "number" : 10, "order" : 4},
        { "name" : "Cake glacé fondant au chocolat", "number" : 10, "order" : 5},
        { "name" : "Eclairs au chocolat", "number" : 10, "order" : 6},
        { "name" : "Tarte poire chocolat", "number" : 10, "order" : 7},
        { "name" : "Banana  au chocolat", "number" : 10, "order" : 8}
    ]
    StockModel.remove({}, function(err) { 
      console.log('Collection removed') 
   });

    if(req.user?.status == "admin"){
    for(let i=0; i<patries.length;i++){
        let name = patries[i].name
        let number = patries[i].number
        let id = patries[i].order
    try {
      const stockuser = await StockModel.createStock(id,name, number);
      // Saves user in session
    } catch (error) {
        console.log(error)
    }
    }
    res.status(200).send("Stock réinitialiser")
    }else {
    res.status(400).send("Stock failed")
   }
}

export async function rewards(req, res){
  const {id_victory } = req.body;
  console.log(id_victory)
  var number_Random = null
  if(req.session.user){
  switch(id_victory){
    default :
      return(res.status(200).json("Vous avez perdus"));
    case 1 :
      number_Random = 1;
      break
    case 2 :
      number_Random = 2;
      break
    case 3 :
      number_Random = 3;
      break
    case 4 :
        number_Random = 4;
        break
  }
  
  
   //Choisir une pattiserie au hasard
   var listRewards = [];
   StockModel.find().then((result) =>{
    var rewards = result;
    var newrewards = rewards.filter((element) => element.number != 0);  
    for(let i = 0 ; i < number_Random ; i++){
    var RandomNumber = Math.floor(Math.random() * newrewards.length);
    listRewards.push(newrewards[RandomNumber]);
     var recompense = listRewards;
    }
    var firstName = req.session.user.firstName;
    var lastName = req.session.user.lastName;
    var email = req.session.user.email;
    RecompenseModel.createRecompense(firstName ,lastName,email,recompense)
    })
    res.status(200).json("Récompense envoyé")
  }else{
    res.status(400).json("rewards failed")
    }
  }