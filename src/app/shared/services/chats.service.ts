import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  public url = environment.apiUrl;
  public socket = io(this.url);

  constructor() { }

  addUser(name, room) {
    this.socket.emit('adduser', name, room);
  }

  public getMessages = () => {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('updatechat', (username, message) => {
        const all = {
          username,
          message
        };
        observer.next(all);
      });
    });
  }

  sendMessage(roomName, username, message) {
    this.socket.emit('sendchat', roomName, username, message);
  }
}
