import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNoteModalPageRoutingModule } from './edit-note-modal-routing.module';

import { EditNoteModalPage } from './edit-note-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditNoteModalPageRoutingModule
  ],
  declarations: [EditNoteModalPage]
})
export class EditNoteModalPageModule {}
