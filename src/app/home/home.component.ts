import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsService } from '../shared/services/rooms.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public name;

  constructor(
    private router: Router,
    private roomService: RoomsService
  ) { }

  ngOnInit(): void {
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
