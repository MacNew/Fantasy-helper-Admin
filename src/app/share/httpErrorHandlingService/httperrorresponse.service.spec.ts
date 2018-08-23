import { TestBed, inject } from '@angular/core/testing';

import { HttperrorresponseService } from './httperrorresponse.service';

describe('HttperrorresponseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttperrorresponseService]
    });
  });

  it('should be created', inject([HttperrorresponseService], (service: HttperrorresponseService) => {
    expect(service).toBeTruthy();
  }));
});
