import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-severity',
  templateUrl: './severity.component.html',
  styleUrls: ['./severity.component.scss']
})
export class SeverityComponent implements OnInit {

  constructor() { }

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {

  }
}
