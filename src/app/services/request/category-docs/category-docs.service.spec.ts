import { TestBed } from '@angular/core/testing';

import { CategoryDocsService } from './category-docs.service';

describe('CategoryDocsService', () => {
  let service: CategoryDocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
