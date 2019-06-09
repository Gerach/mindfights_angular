import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class GameComponent implements OnInit {
  gameEditForm: FormGroup;

  constructor(
    private electronService: ElectronService,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    const gameId = this.route.snapshot.params.id;
    this.getGame(gameId);

    this.gameEditForm = this.formBuilder.group({
      name: [
        '', [
          Validators.required,
          Validators.minLength(5),
        ]
      ],
      date: [
        '', [
          Validators.required,
        ]
      ],
      location: ''
    });
  }

  ngOnInit(): void {
  }

  get name() {
    return this.gameEditForm.get('name');
  }

  set name(value) {
    this.gameEditForm.get('name').setValue(value);
  }

  get date() {
    return this.gameEditForm.get('date');
  }

  set date(value) {
    this.gameEditForm.get('date').setValue(value);
  }

  get location() {
    return this.gameEditForm.get('location');
  }

  set location(value) {
    this.gameEditForm.get('location').setValue(value);
  }

  getGame(gameId): void {
    this.electronService.ipcRenderer.send(SELECT_QUERY, {
      _id: gameId
    });
    this.electronService.ipcRenderer.once(SELECT_QUERY_RESPONSE, (event, data) => {
      this.name = data.name;
      this.date = data.date;
      this.location = data.location;
      this.ref.detectChanges();
    });
  }

  editGame(): void {
    this.electronService.ipcRenderer.send(INSERT_QUERY, {
      name: this.name.value,
      date: this.date.value,
      location: this.location.value
    });
    this.electronService.ipcRenderer.once(INSERT_QUERY_RESPONSE, (event, data) => {
      this.router.navigate(['/games']);
    });
  }

}
