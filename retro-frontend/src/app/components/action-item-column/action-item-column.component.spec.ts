import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActionItemColumnComponent} from './action-item-column.component';
import {AppModule} from '../../app.module';
import {ActionItemService} from '../../services/action-item.service';
import {of} from 'rxjs';

describe('ActionItemColumnComponent', () => {
  let component: ActionItemColumnComponent;
  let fixture: ComponentFixture<ActionItemColumnComponent>;
  const actionItemService = {
    getActionItems: () => of([])
  };

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [
        {provide: ActionItemService, useValue: actionItemService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionItemColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
