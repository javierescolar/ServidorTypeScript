import * as express from 'express';
import * as cors from 'cors';
import { routes } from './Routes';
import * as socketIo from 'socket.io';
import { createServer, Server } from 'http';
import { ENV } from '../environment';
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";

class App {

  public app;
  public io;
  public server;
  public port;
  public versionAPI="/api/v1";


  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = socketIo(this.server);
    this.port = ENV.PORT || 3001;
    this.mountMiddlewares();
    this.mountRoutes();
  }

  private mountMiddlewares(){
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(methodOverride());
    this.app.use(cors())
  }

  private mountRoutes(): void {
    this.app.use(this.versionAPI,routes)
  }

  public listen() {
    this.server.listen(this.port, (err) => {
      if (err) {
        return console.log(err)
      }
      var users={};
      this.io.on('connection', function(socket) {
        socket.on('login', function(data) {
          if (data.user) {
            console.log('usuario ' + data.user + ' conected');
            users[socket.id] = data.user;
            socket.broadcast.emit('admin', { users: users });
          }

        });
        socket.on('disconnect', function(data) {
          console.log('usuario ' +users[socket.id]+ ' disconnected');
          delete users[socket.id];
          socket.broadcast.emit('admin', { users: users });
        });
        socket.emit('admin', { users: users });
      });
      return console.log(`server is listening on ${this.port}`);
    })
  }
}

export default new App();
