import {Component, OnInit} from '@angular/core';
import {ActionItem} from "../../model/action-item";
import {ActionItemService} from "../../services/action-item.service";

@Component({
  selector: 'app-action-item-column',
  templateUrl: './action-item-column.component.html',
  styleUrls: ['./action-item-column.component.css']
})
export class ActionItemColumnComponent implements OnInit {

  constructor(private actionItemService: ActionItemService) { }

  actionItems: ActionItem[];


  ngOnInit() {
    this.getActionItem();
  }

  private getActionItem(): void {
    this.actionItemService.getActionItems().subscribe(
      (actionItemsFromServer: ActionItem[]) => this.actionItems = actionItemsFromServer
    );
  }
}
