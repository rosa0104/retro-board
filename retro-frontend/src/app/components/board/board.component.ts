import {Component, OnInit} from '@angular/core';
import {VALUES as retroItemTypes} from '../../model/retro-item-type';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private retroId: string;
  retroItemTypes = retroItemTypes;

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
