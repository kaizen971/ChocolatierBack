import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  id: {type:Number,required:true},
  name: { type: String, required: true },
  number: { type: Number, required: true },
});

StockSchema.static('createStock', createStock);


async function createStock(id,name, number) {  
    return await this.create({
      id,
      name,
      number,
    });
}

  const collectionName = 'Stock';
  export const StockModel = mongoose.model('Stock', StockSchema, collectionName);