
import {map} from 'rxjs/operators';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import {isPlatformBrowser} from '../../node_modules/@angular/common';

@Injectable()
export class MessagingService {

  public socket: WebSocketSubject<any>;

  public timeoutHandler: any;
  public timeoutTime = 3 * 1000;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.socket = webSocket('wss://echo.websocket.org');
    this.resetTimer();
  }

  public send = (message) => {
    console.log('Sending message via websocket: ', message);
    this.socket.next(message);
    this.resetTimer();
  }

  public resetTimer = () => {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
    }
    this.timeoutHandler = setTimeout(() => {
      console.log('closing socket due innactivity', this.socket);
      this.socket.unsubscribe();
      this.socket.complete();
    }, this.timeoutTime);
  }
}
