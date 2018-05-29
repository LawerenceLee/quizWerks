import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserQuizComponent } from './show-user-quiz.component';

describe('ShowUserQuizComponent', () => {
  let component: ShowUserQuizComponent;
  let fixture: ComponentFixture<ShowUserQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUserQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
