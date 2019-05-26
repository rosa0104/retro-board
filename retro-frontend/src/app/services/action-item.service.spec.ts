import {getTestBed, TestBed} from '@angular/core/testing';
import {ActionItemService} from './action-item.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RetroService} from './retro.service';
import {ActionItem} from '../model/action-item';

describe('ActionItemService', () => {

  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ActionItemService;
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
      service = TestBed.get(ActionItemService);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should POST to the /retros/actionitems endpoint', () => {
    const actionItem = new ActionItem('foo', 'bar');

    service.createNewActionItem(actionItem).subscribe(response => {
      expect(response).toEqual(actionItem);
    });

    const req = httpMock.match('api/retros/123/actionitems/');
    expect(req[0].request.method).toBe('POST');
    expect(req[0].request.body).toEqual(actionItem);
    req[0].flush(actionItem);
  });

  it('should GET from the /retros/actionitems endpoint', () => {
    const actionItem = new ActionItem('foo', 'bar');

    service.getActionItems().subscribe(response => {
      expect(response).toEqual([actionItem]);
    });

    const req = httpMock.match('api/retros/123/actionitems');
    expect(req[0].request.method).toBe('GET');
    req[0].flush([actionItem]);
  });
});
