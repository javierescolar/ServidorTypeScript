import * as mongoose from 'mongoose';
import * as timestamps from 'mongoose-timestamp';

let Schema   = mongoose.Schema;

let userShema = new Schema({
  name:    { type: String },
  last_name:     { type: String },
  username:  { type: String },
  email:   { type: String },
  active:  { type: Boolean, default:false },
  password: {type: String},
  role:{ type: String, enum: ['ADMIN', 'USER'], default: 'USER'},
  gsbase_data:{
    host:{type:String},
    port:{type:String},
    company:{type:String},
    application:{type:String},
    exercise:{type:String},
    user:{type:String},
    pass:{type:String}
  },
  client : { type: Schema.Types.ObjectId, ref: 'Client' },
  license : { type: Schema.Types.ObjectId, ref: 'License' },
});

userShema.plugin(timestamps);

export const User = mongoose.model('User', userShema);
