import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RetroService} from './retro.service';
import {Retro} from '../model/retro';

describe('RetroService', () => {

  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: RetroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          RetroService
        ]
      });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(RetroService);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should POST to the /retros endpoint', () => {
    const retro = new Retro();
    retro.team = 'abcd';

    service.createNewRetro(retro).subscribe(response => {
      expect(response).toEqual(retro);
    });

    const req = httpMock.match('api/retros/');
    expect(req[0].request.method).toBe('POST');
    expect(req[0].request.body).toEqual(retro);
    req[0].flush(retro);
  });

  it('should GET from the /retros endpoint', () => {
    const retro = new Retro();
    retro.team = 'abcd';

    service.getRetrosForCurrentUser().subscribe(response => {
      expect(response).toEqual([retro]);
    });

    const req = httpMock.match('api/retros');
    expect(req[0].request.method).toBe('GET');
    req[0].flush([retro]);
  });
});
