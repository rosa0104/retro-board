import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RetroItem} from "../../model/retro-item";
import {RetroItemService} from "../../services/retro-item.service";
import {timer} from "rxjs";
import {RetroItemType} from "../../model/retro-item-type";

@Component({
  selector: 'app-retro-item-column',
  templateUrl: './retro-item-column.component.html',
  styleUrls: ['./retro-item-column.component.css']
})
export class RetroItemColumnComponent implements OnInit, OnDestroy {
  private timerSubscription: any;

  constructor(private retroItemService: RetroItemService) {
  }

  retroItems: RetroItem[];
  @Input() type: RetroItemType;

  ngOnInit() {
    this.getRetroItemByType();
  }

  private getRetroItemByType(): void {
    this.retroItemService.getRetroItemByType(this.type.id).subscribe(
      (itemsFromServer: RetroItem[]) => {
        this.retroItems = itemsFromServer;
        this.refreshData();
      }
    );
  }

  refreshData() {
    this.timerSubscription = timer(3000).subscribe(() => this.getRetroItemByType());
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
