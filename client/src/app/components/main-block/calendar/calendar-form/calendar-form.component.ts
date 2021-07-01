import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CalendarService} from "../../../../shared/services/calendar.service";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {Subscription} from "rxjs/internal/Subscription";
import {MaterialService} from "../../../../shared/material.service";
import {CustomValidator} from "../../../../validators/custom.validator";
import {Calendar} from "../../../../shared/interfaces";
import {Router} from "@angular/router";



@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  unSub: Subscription;


  types = [
    {
      text: 'цветная',
      type: 'color'
    },
    {
      text: 'с картинками',
      type: 'image'
    }
  ];

  constructor(
    private calendarService: CalendarService,
    private material: MaterialService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.validateTitle();
  }

  ngOnDestroy(): void {
    if (this.unSub) {
      this.unSub.unsubscribe();
    }
  }

  private initForm() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      year: new FormControl(2021, [Validators.required, CustomValidator.restrictedYears]),
      legendType: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    this.form.disable();
    this.unSub = this.calendarService.createCalendar(this.form.value)
      .subscribe(
        (calendar: Calendar) => {
          this.router.navigate(['/main-page']);
        },
        error => {
          this.material.showMessage(error.error.errors[0].msg);
          this.form.enable();
        }

      )
  }

  onChangeRadio(type: string) {
    this.form.patchValue({
      legendType: type
    })
  }

  //попытка в асинхронную валидацию :)
  private validateTitle() {
    this.form.valueChanges
      .pipe(
        //.takeUntil(this.ngUnsubscribe)        // отписка после разрушения
        map(form => form['title']),
        distinctUntilChanged(),                 // брать измененные данные
        debounceTime(300),              // отсрочим
        switchMap(() => {
          return this.calendarService.fetchTitles()
        })
      )
      .subscribe(titles => {
        if (titles.includes(this.form.get('title').value)) {
          this.material.showMessage(`Title "${this.form.get('title').value}" is already taken. Choose another one.`)
          this.form.get('title').setErrors({exist: true})
        }
      });
  }

}
