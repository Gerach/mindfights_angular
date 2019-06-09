import {Component, OnInit} from '@angular/core';
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
export class NewGameComponent implements OnInit{
  currentDate: string;

  constructor(
    private electronService: ElectronService,
    private router: Router
  ) {
    this.getCurrentDate();
  }

  ngOnInit(): void {
  }

  createNewGame(name, date, location) {
    if (!(name.valid && date.valid)) {
      return;
    }
    this.electronService.ipcRenderer.send(INSERT_QUERY, {
      type: 'game',
      name: name.value,
      date: new Date(date.value),
      location: location.value,
    });
    this.electronService.ipcRenderer.once(INSERT_QUERY_RESPONSE, (event, data) => {
      this.router.navigate(['/game/', data._id]);
    });
  }

  getCurrentDate(): void {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    this.currentDate = year + '-' + month + '-' + day;
  }
}
