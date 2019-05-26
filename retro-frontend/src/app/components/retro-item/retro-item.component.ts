import {Component, Input, OnInit} from '@angular/core';
import {RetroItem} from "../../model/retro-item";
import {RetroItemService} from "../../services/retro-item.service";

@Component({
  selector: 'app-retro-item',
  templateUrl: './retro-item.component.html',
  styleUrls: ['./retro-item.component.css']
})
export class RetroItemComponent implements OnInit {

  @Input()
  retroItem: RetroItem;

  constructor(private retroItemService: RetroItemService) {
  }

  ngOnInit() {
  }

  markAsDone() {
    this.retroItemService.markRetroItemAsDone(this.retroItem).subscribe((response) => {
        this.retroItem.done = true;
      }
    );
  }
}
