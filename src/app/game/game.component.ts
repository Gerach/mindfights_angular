import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameId;

  constructor(
    private route: ActivatedRoute
  ) {
    this.getGame();
  }

  ngOnInit() { }

  getGame(): void {
    this.gameId = this.route.snapshot.params.id;
  }

}
