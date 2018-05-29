import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuizMetadataComponent } from './edit-quiz-metadata.component';

describe('EditQuizMetadataComponent', () => {
  let component: EditQuizMetadataComponent;
  let fixture: ComponentFixture<EditQuizMetadataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuizMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuizMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
