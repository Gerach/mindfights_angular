import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

const {
  SELECT_QUERY,
  SELECT_QUERY_RESPONSE
} = require('../../../constants.js');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  gameNameValue: string;
  gameDateValue: string;
  gameLocationValue: string;

  constructor(
    private electronService: ElectronService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getGame();
  }

  launchWindow() {
    if (this.electronService.isElectronApp) {
      const newWindow = new this.electronService.remote.BrowserWindow({
        width: 1000,
        height: 600,
        backgroundColor: '#000000'
      });

      newWindow.loadURL(`file://${__dirname}/dist/mindfights-app2/index.html`);
    }
  }

  getGame() {
    this.electronService.ipcRenderer.send(SELECT_QUERY, {
      _id: 'jfTYumIdxvDZAy49'
    });
    this.electronService.ipcRenderer.on(SELECT_QUERY_RESPONSE, (event, data) => {
      this.gameNameValue = data.name;
      this.gameDateValue = data.date.split(/T/g)[0];
      this.gameLocationValue = data.location;
      this.ref.detectChanges();
    });
  }

}
