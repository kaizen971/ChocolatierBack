import {StockModel} from '../Models/Stock.js'
import { RecompenseModel } from '../Models/Recompense.js';
import { response } from 'express';

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

    if(req.session.user.status == "admin"){
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

export async function DataDashboard(req, res){
  if(req.session.user && req.session.user.status == "client"){
    const email = req.session.user.email
    console.log("client")

    RecompenseModel.find({email:email}).then((response) =>{
      res.status(200).json({response : response, status:"client"});
    })
  }else if(req.session.user && req.session.user.status == "admin"){
    console.log("admin")
    RecompenseModel.find().then((response) =>{
      res.status(200).json({response : response , status : "admin"});
    })
  }
}




  function victory(dicetab) {
    let resultFinal = null;
    let compteur = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < dicetab.length; i++) {
      switch (dicetab[i]) {
        case 1:
          compteur[0] = compteur[0] + 1;
          break;
        case 2:
          compteur[1]++;
          break;
        case 3:
          compteur[2]++;
          break;
        case 4:
          compteur[3]++;
          break;
        case 5:
          compteur[4]++;

          break;
        case 6:
          compteur[5]++;
          break;
        default:
          break;
      }

    }

    if (compteur.includes(2)) {
      resultFinal = { text: "une Paire", id_victory: 1 }
      return(resultFinal)
    }
    else if (compteur.includes(3)) {
      resultFinal = { text: "un Full", id_victory: 2}
      return(resultFinal)
    }
    else if (compteur.includes(4)) {
      resultFinal = { text: "un Carré", id_victory: 3}
      return(resultFinal);
    }
    else if (compteur.includes(5)) {
      resultFinal = { text: "un Yams", id_victory: 4}
      return(resultFinal);

    }
    else {
      resultFinal = { text: false, id_victory: 0 }
      return(resultFinal)
    }
  
  
  
  }
  

export async function launchGame(req,res){

  const {result} = req.body;
  // if(req.session.user){
    var dicetab = []
    const DiceLength = 5;
    
      for (let i = 0; i < DiceLength; i++) {
        var RandomNumber = Math.floor(Math.random() * 6) + 1;
        dicetab.push(RandomNumber)
      }
      let resultFinal = victory(dicetab);
      var id_victory = resultFinal.id_victory 
      var number_Random = null
      if(req.session.user){
      switch(id_victory){
        default :
          number_Random = 0;
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
        if(newrewards.length <= 0){
          res.status(200).json("Plus de stock")
        } 
        for(let i = 0 ; i < number_Random ; i++){
        var RandomNumber = Math.floor(Math.random() * newrewards.length);
        listRewards.push(newrewards[RandomNumber]);
         var recompense = listRewards;
        }
        var firstName = req.session.user.firstName;
        var lastName = req.session.user.lastName;
        var email = req.session.user.email;
        return(RecompenseModel.createRecompense(firstName ,lastName,email,recompense));
        }).then( (response) =>{
          if(listRewards.length >= 0){
          for(let i = 0 ; i < listRewards.length;i++){
            console.log(listRewards[i].name);
           StockModel.updateOne({"name":listRewards[i].name},{ $set: {"number" : listRewards[i].number - 1 }}).then((respons)=>{
            console.log(respons);
           })
          }
          }
        }
        )
        
        res.status(200).json({result:resultFinal, tableau:dicetab,number_Random:number_Random});


      }else{
        res.status(400).json(id_victory)
        }
    }

  
