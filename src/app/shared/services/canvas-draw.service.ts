import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CanvasDrawService {

  public url = environment.apiUrl;
  public socket = io(this.url);

  constructor() { }


  getDraw() {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer) => {
      this.socket.on('draw', (data) => {
        // console.log(data);
        observer.next(data);
      });
    });
  }

  sendDraw(roomName, data) {
    this.socket.emit('draw-coordinates', roomName, data);
  }
}
