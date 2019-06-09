import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const {
  SELECT_QUERY,
  SELECT_QUERY_RESPONSE,
  UPDATE_QUERY,
  UPDATE_QUERY_RESPONSE
} = require('../../../constants.js');

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameId: string;
  gameEditForm: FormGroup;

  constructor(
    private electronService: ElectronService,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.gameId = this.route.snapshot.params.id;
    this.getGame();

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

  getGame(): void {
    this.electronService.ipcRenderer.send(SELECT_QUERY, {
      _id: this.gameId
    });
    this.electronService.ipcRenderer.once(SELECT_QUERY_RESPONSE, (event, data) => {
      this.name = data.name;
      this.date = data.date;
      this.location = data.location;
      this.ref.detectChanges();
    });
  }

  editGame(): void {
    this.electronService.ipcRenderer.send(UPDATE_QUERY, {
      id: this.gameId,
      data: {
        name: this.name.value,
        date: this.date.value,
        location: this.location.value,
        slides: {0: 'aaaa', 1: 'bbbb'}
      }
    });

    this.electronService.ipcRenderer.once(UPDATE_QUERY_RESPONSE, (event, data) => {
      console.log(data);
    });
  }

}
