import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FaceFormComponent } from './face-form.component';

describe('FaceFormComponent', () => {
  let component: FaceFormComponent;
  let fixture: ComponentFixture<FaceFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FaceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
