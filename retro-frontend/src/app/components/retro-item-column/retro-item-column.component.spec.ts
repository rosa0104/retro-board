import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RetroItemColumnComponent} from './retro-item-column.component';
import {RetroItemService} from '../../services/retro-item.service';
import {RetroItem} from '../../model/retro-item';
import {AppModule} from '../../app.module';
import {of} from 'rxjs';
import {RetroItemType} from '../../model/retro-item-type';

describe('RetroItemColumnComponent', () => {
  let component: RetroItemColumnComponent;
  let fixture: ComponentFixture<RetroItemColumnComponent>;
  const retroItemService = {
    getRetroItemByType: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [
        {provide: RetroItemService, useValue: retroItemService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetroItemColumnComponent);
    component = fixture.componentInstance;
    const retroItem = new RetroItem('abc', 'bcd');
    retroItem.id = '123';
    component.retroItems = [retroItem];

    component.type = RetroItemType.POSITIVE;
    component.refreshData = () => {};
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
