import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-main',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
