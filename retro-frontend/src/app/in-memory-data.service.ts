import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {

    const retros = [
      {id: 'abc', date: '2019-04-21', team: 'Die Schnullis'},
      {id: 'cde', date: '2019-04-18', team: 'Pinke Panther'},
      {id: 'asdasda', date: '2019-04-12', team: 'Pinke Panther'},
      {id: 'erwerwe', date: '2019-04-05', team: 'Die Schnullis'}
    ];
    const retroitems = [
      {id: 'ahskd', title: 'Neues Teammitglied', type: 'positive'},
      {id: 'hcfgjvg', title: 'Stories accepted', type: 'positive'},
      {id: 'aefjf', title: 'Team Lunch', type: 'positive'},
      {id: 'lkhdf', title: 'Diskussion mit Product Owner', type: 'neutral'},
      {id: 'awtrdj', title: 'Blöder Bug', type: 'negative'},
      {id: 'uftijk', title: 'Immernoch keine User Tests', type: 'negative'}
     ];
    const actionitems = [
      {id: 'dfasdsda', title: 'um dolor sit amet, consectetur adipiscing'},
      {id: 'dfasdsda', title: 'um dolor sit amet, consectetur adipiscing'},
      {id: 'dfasdsda', title: ' consectetur adipiscing'},
      {id: 'dfasdsda', title: 'um dolor sit amet, consectetur'},
      {id: 'dfasdsda', title: 'um dolor sit amet, consectetur adipiscing'}
      ]
    ;
    return {retros, retroitems,  actionitems};
  }
}
