import { Component } from '@angular/core';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent {

  constructor() {}

  createNewGame(name, date, location) {
    console.log(name.value);
    console.log(date.value);
    console.log(location.value);
    window.location.href = '';
  }

}
