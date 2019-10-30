import { TestBed } from '@angular/core/testing';

import { CommonHttpService } from './common-http.service';

describe('CommonHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonHttpService = TestBed.get(CommonHttpService);
    expect(service).toBeTruthy();
  });
});
