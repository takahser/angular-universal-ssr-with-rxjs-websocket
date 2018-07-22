import { Component, PLATFORM_ID, Inject } from '@angular/core';
import {MessagingService} from './messaging.service';
import {isPlatformBrowser} from '../../node_modules/@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  private socketConnected = false;
  socketData = [];

  constructor(private messagingService: MessagingService,
    @Inject(PLATFORM_ID) private platformId: Object) {
    messagingService.socket.subscribe(msg => {
      console.log('got msg: ', msg);
      if (!this.socketConnected) {
        this.socketConnected = true;
        this.ensureSocketData();
      }
      this.socketData = [ ...this.socketData, msg ];
    });

    this.ensureSocketData();
  }

  private ensureSocketData = () => {
    if (this.messagingService.socket && this.socketData.length === 0) {
      this.messagingService.send('Test Message');
    }
  }
}
