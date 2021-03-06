import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverallComponent } from './overall.component';

describe('OverallComponent', () => {
  let component: OverallComponent;
  let fixture: ComponentFixture<OverallComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
