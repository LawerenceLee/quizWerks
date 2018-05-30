import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloQuizComponent } from './solo-quiz.component';

describe('SoloQuizComponent', () => {
  let component: SoloQuizComponent;
  let fixture: ComponentFixture<SoloQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoloQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
