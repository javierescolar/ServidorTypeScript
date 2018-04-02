import * as mongoose from 'mongoose';
import * as timestamps from 'mongoose-timestamp';

let Schema   = mongoose.Schema;

let clientShema = new Schema({
  name:    { type: String },
  last_name:{ type: String},
  applications:[
    {
      name:{type:String},
      host:{type:String}
    }
  ],
  gsbase_data:{
    cod_client:{type:String}
  },
  licenses : [
    { type: Schema.Types.ObjectId, ref: 'License' }
  ],
  users : [
    { type: Schema.Types.ObjectId, ref: 'User' }
  ],
});
clientShema.plugin(timestamps);

export const Client = mongoose.model('Client', clientShema);
