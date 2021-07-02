import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CalendarService} from "../../../shared/services/calendar.service";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {



  constructor(
    public dialog: MatDialog,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
  }

  onCloseDialog() {
    this.dialog.closeAll();
  }

  onYes() {
    this.dialog.closeAll()
  }
}
