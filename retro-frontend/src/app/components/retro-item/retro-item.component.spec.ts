import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RetroItemComponent} from './retro-item.component';
import {RetroItemService} from '../../services/retro-item.service';
import {RetroItem} from '../../model/retro-item';

describe('RetroItemComponent', () => {
  let component: RetroItemComponent;
  let fixture: ComponentFixture<RetroItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetroItemComponent ],
      providers: [
        {provide: RetroItemService, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetroItemComponent);
    component = fixture.componentInstance;
    component.retroItem = new RetroItem('abc', 'bcd');
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
