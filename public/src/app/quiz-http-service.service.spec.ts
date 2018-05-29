import { TestBed, inject } from '@angular/core/testing';

import { QuizHttpServiceService } from './quiz-http-service.service';

describe('QuizHttpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizHttpServiceService]
    });
  });

  it('should be created', inject([QuizHttpServiceService], (service: QuizHttpServiceService) => {
    expect(service).toBeTruthy();
  }));
});
