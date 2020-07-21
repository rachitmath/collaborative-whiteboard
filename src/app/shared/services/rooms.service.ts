import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  public url = environment.apiUrl;
  public socket = io(this.url);

  constructor(
  ) { }

  async createRooms() {
    const roomName = Math.floor(Math.random() * 90000) + 10000;
    this.socket.emit('create', roomName);
  }

  getRoomName() {
    return new Promise((resolve, reject) => {
      this.socket.on('getroom', (room) => {
        resolve(room);
      });
    });
  }

  checkTotalUserInRoom(roomName) {
    this.socket.emit('check-user', roomName);
    return new Promise((resolve, reject) => {
      this.socket.on('total-user', (room) => {
        resolve(room);
      });
    });
  }
}
