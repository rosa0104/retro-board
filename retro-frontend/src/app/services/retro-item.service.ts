import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RetroItem} from "../model/retro-item";
import {RetroService} from "./retro.service";

@Injectable({
  providedIn: 'root'
})
export class RetroItemService {

  constructor(
    private  http: HttpClient,
    private retroService: RetroService
  ) { }
  getRetroItemByType(retroItemType: string):
    Observable<RetroItem[]>{
    const retroId = this.retroService.getCurrentRetro().id;
    let url = 'api/retros/' + retroId + '/retroitems/?type='+retroItemType;
    let response = this.http.get<RetroItem[]>(url);
    return response
  }

  createNewRetroItem(retroItem: RetroItem): Observable<RetroItem> {
    const retroId = this.retroService.getCurrentRetro().id;
    let url = 'api/retros/' + retroId + '/retroitems/';
    let response = this.http.post<RetroItem>(url, retroItem);
    return response
  }

  markRetroItemAsDone(retroItem: RetroItem): Observable<RetroItem> {
    retroItem.done = true;
    let url = 'api/retroitems/' + retroItem.id;
    let response = this.http.put<RetroItem>(url, retroItem);
    return response;
  }
}
