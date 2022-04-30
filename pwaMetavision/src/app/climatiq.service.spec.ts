import { TestBed } from '@angular/core/testing';

import { ClimatiqService } from './climatiq.service';

describe('ClimatiqService', () => {
  let service: ClimatiqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClimatiqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
