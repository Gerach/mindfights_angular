import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';

const {
  INSERT_QUERY,
  INSERT_QUERY_RESPONSE
} = require('../../../constants.js');

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent {
  constructor(
    private electronService: ElectronService,
    public router: Router
  ) { }

  createNewGame(name, date, location) {
    if (name.valid && date.valid) {
      this.electronService.ipcRenderer.send(INSERT_QUERY, {
        type: 'game',
        name: name.value,
        date: new Date(date.value),
        location: location.value,
      });
      this.electronService.ipcRenderer.once(INSERT_QUERY_RESPONSE, (event, data) => {
        this.router.navigate(['game/' + data._id]);
      });
    }
  }
}
