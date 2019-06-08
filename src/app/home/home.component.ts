import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private electronService: ElectronService) { }

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

}
