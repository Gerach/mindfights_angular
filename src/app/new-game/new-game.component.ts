import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

const {
  INSERT_QUERY,
} = require('../../../constants.js');

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent {
  constructor(private electronService: ElectronService) { }

  createNewGame(name, date, location) {
    if (name.valid && date.valid) {
      this.electronService.ipcRenderer.send(INSERT_QUERY, {
        type: 'game',
        name: name.value,
        date: new Date(date.value),
        location: location.value,
      });
      window.location.href = '';
    }
  }
}
