import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const {
  INSERT_QUERY,
  INSERT_QUERY_RESPONSE
} = require('../../../constants.js');

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.css']
})
export class NewGameComponent implements OnInit {
  gameForm: FormGroup;

  constructor(
    private electronService: ElectronService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.gameForm = this.formBuilder.group({
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

  get name() {
    return this.gameForm.get('name');
  }

  get date() {
    return this.gameForm.get('date');
  }

  get location() {
    return this.gameForm.get('location');
  }

  createNewGame() {
    this.electronService.ipcRenderer.send(INSERT_QUERY, {
      name: this.name.value,
      date: this.date.value,
      location: this.location.value,
      slides: []
    });
    this.electronService.ipcRenderer.once(INSERT_QUERY_RESPONSE, (event, data) => {
      this.router.navigate(['/game/', data._id]);
    });
  }
}
