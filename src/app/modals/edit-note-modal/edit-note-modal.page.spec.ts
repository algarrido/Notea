import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditNoteModalPage } from './edit-note-modal.page';

describe('EditNoteModalPage', () => {
  let component: EditNoteModalPage;
  let fixture: ComponentFixture<EditNoteModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNoteModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditNoteModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
