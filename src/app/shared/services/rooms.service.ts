import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  public socket = io('http://localhost:4000');

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
