import * as mongoose from 'mongoose';
import * as timestamps from 'mongoose-timestamp';

let Schema   = mongoose.Schema;

let licenseShema = new Schema({
  client:  { type: Schema.Types.ObjectId, ref: 'Client' }
});

licenseShema.plugin(timestamps);

export const License = mongoose.model('License', licenseShema);
