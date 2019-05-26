import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActionItem} from '../model/action-item';
import {Observable} from 'rxjs';
import {RetroService} from './retro.service';

@Injectable({
  providedIn: 'root'
})
export class ActionItemService {

  constructor(
    private  http: HttpClient,
    private retroService: RetroService
  ) { }

  getActionItems():
  Observable<ActionItem[]> {
    const retroId = this.retroService.getCurrentRetro().id;
    const url = 'api/retros/' + retroId + '/actionitems';
    return this.http.get<ActionItem[]>(url);
  }

  createNewActionItem(actionItem: ActionItem): Observable<ActionItem> {
    const retroId = this.retroService.getCurrentRetro().id;
    const url = 'api/retros/' + retroId + '/actionitems/';
    return this.http.post<ActionItem>(url, actionItem);
  }
}
