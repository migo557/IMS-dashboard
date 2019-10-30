import { TestBed } from '@angular/core/testing';

import { ProjectHttpService } from './project-http.service';

describe('ProjectHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectHttpService = TestBed.get(ProjectHttpService);
    expect(service).toBeTruthy();
  });
});
