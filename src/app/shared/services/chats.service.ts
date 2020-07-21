import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  public socket = io('http://localhost:4000');

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
