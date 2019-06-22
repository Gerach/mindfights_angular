import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElectronService } from 'ngx-electron';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';

const {
  SELECT_QUERY,
  SELECT_QUERY_RESPONSE,
  UPDATE_QUERY,
  UPDATE_QUERY_RESPONSE
} = require('../../../constants.js');

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit, OnDestroy {
  public gameId: string;
  public slideForm: FormGroup;
  public slides;
  public lastSlideOrder;

  constructor(
    private electronService: ElectronService,
    private route: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params.id;
    this.buildForm();
    this.slides = [];
    this.getSlidesForGame();
  }

  ngOnDestroy(): void {
  }

  buildForm(): void {
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

  set question(value) {
    this.slideForm.get('question').setValue(value);
  }

  get time() {
    return this.slideForm.get('time');
  }

  set time(value) {
    this.slideForm.get('time').setValue(value);
  }

  getSlidesForGame(): void {
    this.electronService.ipcRenderer.send(SELECT_QUERY, {
      _id: this.gameId
    });
    this.electronService.ipcRenderer.once(SELECT_QUERY_RESPONSE, (event, data) => {
      let maxSlideOrder = 0;

      if (data.slides) {
        this.slides = data.slides;

        for (const slide of data.slides) {
          if (slide.order > maxSlideOrder) {
            maxSlideOrder = slide.order;
          }
        }
        this.lastSlideOrder = maxSlideOrder;
      }

      this.ref.detectChanges();
    });
  }

  createNewSlide(): void {
    this.slides.push({
      order: this.lastSlideOrder + 1,
      question: this.question.value,
      time: this.time.value
    });

    this.electronService.ipcRenderer.send(UPDATE_QUERY, {
        id: this.gameId,
        data: {
          slides: this.slides
        }
    });

    this.electronService.ipcRenderer.once(UPDATE_QUERY_RESPONSE, (event, data) => {
      if (data === 1) {
        this.router.navigate(['/game/', this.gameId]).then(() => {
          this.ngOnDestroy();
        });
      }
    });
  }
}
