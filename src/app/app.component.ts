import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'softrams-racing';

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    if (!this.appService.getUsername()) {
      this.appService.setUsername(localStorage.getItem('username'));
    }
  }
}
