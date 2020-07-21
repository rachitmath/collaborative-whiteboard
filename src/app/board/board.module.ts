import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerModule } from 'ngx-color-picker';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { CanvasComponent } from './canvas/canvas.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [
    BoardComponent,
    CanvasComponent,
    NavbarComponent,
    ChatBoxComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    ColorPickerModule,
    FormsModule,
    ClipboardModule
  ]
})
export class BoardModule { }
