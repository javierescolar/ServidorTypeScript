import * as mongoose from 'mongoose';
import {ENV} from '../environment';

class DB {
  getConnection(){
    mongoose.connect(ENV.URL_MONGODB, function(err, res) {
      if(err) {
        console.log('ERROR: connecting to Database. ' + err);
      } else{
        console.log('Conexión con Mongo db en'+ENV.URL_MONGODB);
      }
    });
  }
}

export default new DB();
