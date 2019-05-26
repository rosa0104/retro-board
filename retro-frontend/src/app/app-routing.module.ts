import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RetroComponent} from './components/retro/retro.component';
import {BoardComponent} from './components/board/board.component';
import {RetroItemFormComponent} from './components/retro-item-form/retro-item-form.component';
import {ActionItemFormComponent} from './components/action-item-form/action-item-form.component';

const routes: Routes = [
  {path: 'retros', component: RetroComponent},
  {path: 'board', component: BoardComponent},
  {path: 'add-retro-item', component: RetroItemFormComponent},
  {path: 'add-action-item', component: ActionItemFormComponent},
  {path: '', component: RetroComponent} // by default open the retro component for now
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
