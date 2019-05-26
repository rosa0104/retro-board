import {Component, Input, OnInit} from '@angular/core';
import {ActionItem} from "../../model/action-item";

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.css']
})
export class ActionItemComponent implements OnInit {

  @Input()
  actionItem: ActionItem;

  constructor() { }

  ngOnInit() {
  }

}
