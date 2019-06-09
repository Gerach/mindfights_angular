import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';

const {
  INSERT_QUERY,
  INSERT_QUERY_RESPONSE,
  SELECT_QUERY,
  SELECT_QUERY_RESPONSE
} = require('../../../constants.js');

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  gameNameValue: string;
  gameDateValue: string;
  gameLocationValue: string;

  constructor(
    private electronService: ElectronService,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
  ) {
    const gameId = this.route.snapshot.params.id;
    this.getGame(gameId);
  }

  ngOnInit(): void {
  }

  getGame(gameId): void {
    this.electronService.ipcRenderer.send(SELECT_QUERY, {
      _id: gameId
    });
    this.electronService.ipcRenderer.once(SELECT_QUERY_RESPONSE, (event, data) => {
      this.gameNameValue = data.name;
      this.gameDateValue = data.date.split(/T/g)[0];
      this.gameLocationValue = data.location;
      this.ref.detectChanges();
    });
  }

  editGame(name, date, location): void {
    // add additional validation for new fields
    if (name.valid && date.valid) {
      this.electronService.ipcRenderer.send(INSERT_QUERY, {
        type: 'game',
        name: name.value,
        date: new Date(date.value),
        location: location.value,
      });
      this.electronService.ipcRenderer.once(INSERT_QUERY_RESPONSE, (event, data) => {
        this.router.navigate(['/games']);
      });
    }
  }

}
