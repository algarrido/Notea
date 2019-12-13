import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNoteModalPage } from './edit-note-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditNoteModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNoteModalPageRoutingModule {}
