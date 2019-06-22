import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';

const {
  UPDATE_QUERY,
  UPDATE_QUERY_RESPONSE
} = require('../../../constants.js');

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
  public gameId: string;
  public slideForm: FormGroup;

  constructor(
    private electronService: ElectronService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.slideForm = this.formBuilder.group({
      question: [
        '', [
          Validators.required,
          Validators.minLength(5),
        ]
      ],
      time: [
        '', [
          Validators.pattern('^[0-9]+$'),
          Validators.min(0),
          Validators.max(15 * 60),
          Validators.required,
        ]
      ]
    });
  }

  get question() {
    return this.slideForm.get('question');
  }

  get time() {
    return this.slideForm.get('time');
  }

  createNewSlide() {
    // TODO: implementation
    const query = {};

    this.electronService.ipcRenderer.send(UPDATE_QUERY, query);
    this.electronService.ipcRenderer.once(UPDATE_QUERY_RESPONSE, (event, data) => {
      if (data === 1) {
        this.router.navigate(['/game/', this.gameId]);
      }
    });
  }
}
