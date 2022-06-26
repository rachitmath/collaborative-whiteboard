import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoomsService } from '../shared/services/rooms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public name;
  public lastRecordedSession;

  constructor(
    private router: Router,
    private roomService: RoomsService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.lastRecordedSession = this.domSanitizer.bypassSecurityTrustUrl(localStorage.getItem('recordedSession'));
    console.log(this.lastRecordedSession);

  }

  onSubmit() {
    localStorage.setItem('username', this.name);
    this.roomService.createRooms().then(res => {
      this.roomService.getRoomName().then(name => {
        this.router.navigate(['/board/' + name]);
      });
    });
  }
}
