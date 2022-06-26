import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CanvasComponent } from './canvas/canvas.component';
import { ChatsService } from '../shared/services/chats.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../shared/services/rooms.service';
import * as RecordRTC from 'recordrtc/RecordRTC.js';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(CanvasComponent, { static: false })
  private canvasComponent: CanvasComponent;

  selectedColor = '';
  selectedSize = 3;
  bomb: any;

  public cursorType = 'pencil';

  public username;
  public boardId: any;


  private stream: MediaStream;
  private recordRTC: any;

  @ViewChild('video') video;

  constructor(
    private chatService: ChatsService,
    private roomService: RoomsService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(param => {
      this.boardId = param.boardid;
    });

    this.startRecording();

    // this.roomService.checkTotalUserInRoom(this.boardId).then(user => {
    //   console.log(user);
    // if (user <= 2) {
    this.username = localStorage.getItem('username');
    if (!this.username) {
      const name = prompt('What\'s your name: ');
      if (name != null) {
        this.username = name;
        localStorage.setItem('username', this.username);
      }
    }
    this.chatService.addUser(this.username, this.boardId);
    // } else {
    //   this.router.navigate(['/']);
    // }
    // });
  }

  ngAfterViewInit() {
    console.log(this.selectedColor);
  }

  update(jscolor) {
    console.log('tester', jscolor);
    this.selectedColor = jscolor;
    console.log(this.selectedColor);
  }

  microify(jscolor) {
    this.selectedSize = 3;
    this.draw(jscolor);
  }

  smallify(jscolor) {
    this.selectedSize = 6;
  }

  medify(jscolor) {
    this.selectedSize = 15;
  }

  bigify(jscolor) {
    this.selectedSize = 40;
  }

  selectDrawType(type) {
    this.selectedColor = '#000000';
    switch (type) {
      case 'pencil':
        this.selectedSize = 3;
        this.cursorType = 'pencil';
        break;
      case 'pen':
        this.selectedSize = 6;
        break;
      case '':
        this.selectedSize = 15;
        break;
      case 'brush':
        this.selectedSize = 40;
        this.cursorType = 'brush';
        break;
      default:
        this.selectedSize = 3;
        this.cursorType = 'pencil';
        break;
    }
  }

  eraser() {
    this.selectedColor = '#FFFFFF';
    this.cursorType = 'eraser';
    this.selectedSize = 40;
    console.log(this.selectedColor);
  }

  draw(jscolor) {
    this.selectedColor = jscolor;
    if (this.selectedColor == undefined) {
      this.selectedColor = '#000000';
    }
  }

  clear() {
    this.canvasComponent.redraw();
    console.log('After the redraw');
    // this.socket.emit('clear');
    console.log('clear function called');
  }


  successCallback(stream: MediaStream) {
    const options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    // const video: HTMLVideoElement = this.video.nativeElement;
    // video.src = window.URL.createObjectURL(stream);
    console.log(stream);
  }

  errorCallback() {
    // handle error here
  }

  processVideo(audioVideoWebMURL) {
    // const video: HTMLVideoElement = this.video.nativeElement;
    const recordRTC = this.recordRTC;
    // video.src = audioVideoWebMURL;
    // this.toggleControls();
    const recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL((dataURL) => {
      console.log(dataURL);
    });
  }

  startRecording() {
    const mediaConstraints: any = {
      video: {
        displaySurface: 'window', // monitor, window, application, browser
        logicalSurface: true,
        cursor: 'always' // never, always, motion
      }, audio: true
    };
    // navigator.getDisplayMedia(mediaConstraints)
    navigator.mediaDevices.getDisplayMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  stopRecording() {
    const recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    const stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  ngOnDestroy() {
    this.stopRecording();
  }
}
