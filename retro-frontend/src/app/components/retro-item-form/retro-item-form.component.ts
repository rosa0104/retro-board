import {Component, OnInit} from '@angular/core';
import {RetroItem} from "../../model/retro-item";
import {RetroItemService} from "../../services/retro-item.service";

@Component({
  selector: 'app-retro-item-form',
  templateUrl: './retro-item-form.component.html',
  styleUrls: ['./retro-item-form.component.css']
})
export class RetroItemFormComponent implements OnInit {

  types = ['positive', 'neutral', 'negative'];
  retroItem: RetroItem = new RetroItem('', this.types[0]);
  submitted = false;


  constructor( private retroItemService: RetroItemService ) { }

  ngOnInit() {
  }

  newRetroItem() {
    this.retroItem  = new RetroItem('', this.types[0]);
  }

  onSubmit() {
    this.retroItemService.createNewRetroItem(this.retroItem).subscribe(
      () =>{
        console.log("Created successfully");
        this.submitted = true;
        this.newRetroItem();
      }
    );
  }

}
