import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoservicioService } from '../../servicios/todoservicio.service';
import { note } from '../../modelo/note';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-note-modal',
  templateUrl: './edit-note-modal.page.html',
  styleUrls: ['./edit-note-modal.page.scss'],
})

export class EditNoteModalPage implements OnInit {
  public todoForm: FormGroup;
  @Input("note") note;

  constructor(private formBuilder: FormBuilder, private todoS: TodoservicioService,
    private modalController: ModalController, public navParams: NavParams, public navCtrl: NavController) { }

  ngOnInit() {
    console.log(this.note.title);
    this.todoForm = this.formBuilder.group({
      title: [this.note.title, Validators.required],
      description: [this.note.description]
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

  editaNota() {
    console.log(this.note.id);
    this.note = {
      id: this.note.id,
      title: this.todoForm.get('title').value,
      description: this.todoForm.get('description').value,
    };
    this.todoS.updateTODO(this.note.id, this.note)
      .then((salida) => {
        this.modalController.dismiss();
      }).catch((err) => {
        console.log(err);
      });
  }
}
