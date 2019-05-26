import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Retro} from '../model/retro';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetroService {

  private currentRetro: Retro = {} as Retro;
  public retros: Retro[] = [];

  constructor(
    private http: HttpClient
  ) {
  }

  getRetrosForCurrentUser(): Observable<Retro[]> {
    const url = 'api/retros';
    const result = this.http.get<Retro[]>(url);
    result.subscribe((retros: Retro[]) => {
      this.retros = retros;
      if (!this.currentRetro) {
        this.currentRetro = retros[0];
      }
    });
    return result;
  }

  getCurrentRetro(): Retro {
    return this.currentRetro;
  }

  setCurrentRetroId(retroId: string) {
    this.currentRetro = this.retros.find(retro => retro.id === retroId);
  }

  createNewRetro(retroRequest: Retro): Observable<Retro> {
    const url = 'api/retros/';
    const response = this.http.post<Retro>(url, retroRequest);
    response.subscribe((retro: Retro) => {
      this.retros.unshift(retro);
      this.currentRetro = retro;
    });
    return response;
  }
}
