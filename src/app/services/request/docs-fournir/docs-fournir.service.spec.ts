import { TestBed } from '@angular/core/testing';

import { DocsFournirService } from './docs-fournir.service';

describe('DocsFournirService', () => {
  let service: DocsFournirService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocsFournirService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
