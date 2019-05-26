import {Component, OnInit} from '@angular/core';
import {ActionItem} from "../../model/action-item";
import {ActionItemService} from "../../services/action-item.service";

@Component({
  selector: 'app-action-item-form',
  templateUrl: './action-item-form.component.html',
  styleUrls: ['./action-item-form.component.css']
})
export class ActionItemFormComponent implements OnInit {

  actionItem: ActionItem = new ActionItem('', '');
  submitted = false;

  constructor( private actionItemService: ActionItemService) { }

  ngOnInit() {
  }

  newActionItem() {
    this.actionItem = new ActionItem('', '');
  }

  onSubmit() {
    this.actionItemService.createNewActionItem(this.actionItem).subscribe(
      () => {
        console.log(JSON.stringify(this.actionItem));
        this.submitted = true;
        this.newActionItem();
      }
    );
  }

}
