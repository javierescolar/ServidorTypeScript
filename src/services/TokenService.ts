import * as jwt from 'jwt-simple';
import * as moment from 'moment';


class TokenService {

  createToken(user,secret){
    var payload = {
      sub:user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      iat: moment().unix(),
      exp:moment().add(1, 'day').unix()
    }
    return jwt.encode(payload,secret);
  }

  decodeToken(token,secret){
    try{
      var payload = jwt.decode(token,secret);
      return payload;
    } catch(ex) {
      return false;
    }
  }

  checkTokenExpirate(token,secret){
    var payload=this.decodeToken(token,secret);
    return (payload.exp <= moment().unix());
  }
}

export default new TokenService()
