import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CalendarService} from "../../../../shared/services/calendar.service";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {Subscription} from "rxjs/internal/Subscription";
import {MaterialService} from "../../../../shared/material.service";
import {CustomValidator} from "../../../../validators/custom.validator";
import {Calendar} from "../../../../shared/interfaces";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  unSub: Subscription;
  calendar: Calendar;
  editMode = false;


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
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initForm();

    this.route.data.subscribe(
      (data) => {
        if (data.calendar){
          this.editMode = true;
          console.log(this.editMode)
          this.calendar = data.calendar;
          this.form.setValue({
            title: this.calendar.title,
            description: this.calendar.description,
            year: this.calendar.year,
            legendType: this.calendar.legendType
          })

        }
      }
    )

    if (!this.editMode){
      this.validateTitle();
    }
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
    let obs$;
    const calendar = {
      title: this.form.value.title,
      description: this.form.value.description,
      year: this.form.value.year
    }
    if (this.editMode){
      obs$ = this.calendarService.updateCalendar(calendar, this.calendar._id)
    } else {
      obs$ = this.calendarService.createCalendar(this.form.value)
    }

    this.unSub = obs$.subscribe(
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
