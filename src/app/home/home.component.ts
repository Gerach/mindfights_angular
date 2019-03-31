import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

const {
  SELECT_QUERY,
} = require('../../../constants.js');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  text: string;

  constructor(private electronService: ElectronService) {
    this.text = 'Nothing';
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
  setText(text) {
    this.text = text;
  }

  dbTest() {
    const query = {
      game: 'test game',
      date_planned: new Date('2019-04-20'),
      location: 'MIF',
    };

    this.electronService.ipcRenderer.send(SELECT_QUERY, query);
    this.electronService.ipcRenderer.once(SELECT_QUERY, (event, data) => {
      this.setText(JSON.stringify(data[0]));
    });
  }

}
