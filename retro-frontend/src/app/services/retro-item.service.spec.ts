import {getTestBed, TestBed} from '@angular/core/testing';

import {RetroItemService} from './retro-item.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ActionItemService} from './action-item.service';
import {RetroService} from './retro.service';
import {RetroItem} from '../model/retro-item';

describe('RetroItemService', () => {

  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: RetroItemService;
  const mockRetroService = {
    getCurrentRetro: () => ({id: '123'})
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ActionItemService,
        {provide: RetroService, useValue: mockRetroService}
      ]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(RetroItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST to the /retros/retroitems endpoint', () => {
    const retroItem = new RetroItem('foo', 'bar');

    service.createNewRetroItem(retroItem).subscribe(response => {
      expect(response).toEqual(retroItem);
    });

    const req = httpMock.match('api/retros/123/retroitems/');
    expect(req[0].request.method).toBe('POST');
    expect(req[0].request.body).toEqual(retroItem);
    req[0].flush(retroItem);
  });

  it('should GET from the /retros/retroitems endpoint', () => {
    const retroItem = new RetroItem('foo', 'bar');

    service.getRetroItemByType('positive').subscribe(response => {
      expect(response).toEqual([retroItem]);
    });

    const req = httpMock.match('api/retros/123/retroitems/?type=positive');
    expect(req[0].request.method).toBe('GET');
    req[0].flush([retroItem]);
  });
});
