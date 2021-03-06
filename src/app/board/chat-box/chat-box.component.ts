import { Component, OnInit, OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ChatsService } from 'src/app/shared/services/chats.service';
import { ActivatedRoute } from '@angular/router';

export class All {
  username: string;
  message: string;
}

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit {

  @ViewChild('chatBox') private chatBox: ElementRef;

  public userName;
  public data: All[] = [];
  public message;

  public boardId: any;

  constructor(
    private chatService: ChatsService,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
    this.activateRoute.params.subscribe(param => {
      this.boardId = param.boardid;
    });
    this.chatService.getMessages().subscribe((res: All) => {
      console.log(res);
      this.data.push(res);
      setTimeout(() => {
        this.scrollToBottom();
      }, 600);
    });
  }

  onSubmit() {
    this.chatService.sendMessage(this.boardId, this.userName, this.message);
    this.message = '';
  }

  scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
