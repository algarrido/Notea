import { Component } from '@angular/core';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { LoadingController } from '@ionic/angular';
import { Router, Data } from '@angular/router';
//import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { EditNoteModalPage } from '../modals/edit-note-modal/edit-note-modal.page';
import { AlertController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public listadoPanel;
  public listadoPanelCopy;
 
  //public expresion = /^[9|6|7][0-9]{8}$/;

  constructor(private todoS: TodoservicioService,
    public loadingController: LoadingController, private router: Router, public modalController: ModalController,
    public alertController: AlertController, private callNumber: CallNumber) {
  }

    callNow(item:Data) {
     this.callNumber.callNumber(item.description, true)
       .then(res => 
         console.log('Launched dialer!,entra', res))
         
       .catch(err => 
         console.log('Error launching dialer, no entra', err));
    }
 
  ngOnInit() {
    this.refrescar();
  }

  async alertBorraNota(id: string) {
    const alert = await this.alertController.create({
      header: 'Borrar Nota',
      message: '¿Estás seguro que desea borrar esta nota?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.borraNota(id);
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }
  public note = {
    id: '',
    title: '',
    description: ''
  };

  async openEditModal(item: Data) {
    this.note = {
      id: item.id,
      title: item.title,
      description: item.description
    };

    const modal = await this.modalController.create({
      component: EditNoteModalPage,
      componentProps: {
        note: this.note
      }
    });

    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      this.note = dataReturned.data;
      console.log('Receive: ', this.note);
    });
    return await modal.present().then(_ => {
      // triggered when opening the modal
      console.log('Sending: ', this.note);
    });
  }

  public borraNota(id: string) {
    console.log("Borrando...");
    this.todoS.removeTODO(id)
      .then((salida) => {
        this.refrescar();
      }).catch((err) => {
        console.log(err);
      });
  }

  private refrescar() {
    this.presentLoading();
    this.listadoPanel = [];
    console.log("Cargando notas");
    try {
      this.todoS.readTODO2().subscribe((lista) => {
        this.listadoPanel = lista;
        this.listadoPanelCopy = lista;
        this.loadingController.dismiss();
      });
      console.log("Solicitada la peticion");
    } catch (error) {
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await loading.present();
  }

  public doRefresh(event: any) {
    this.listadoPanel = [];
    console.log("Cargando notas");
    let Myobservable = this.todoS.readTODO();
    Myobservable.subscribe((lista) => {
      this.listadoPanel = [];
      lista.docs.forEach((nota) => {
        this.listadoPanel.push({ id: nota.id, ...nota.data() });
      });
      this.loadingController.dismiss();
    })
    event.target.complete();
  }
  public irNueva(): void {
    this.router.navigateByUrl('/tabs/tab1');
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.listadoPanel = this.listadoPanelCopy;

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.isItemAvailable = true;
      this.listadoPanel = this.listadoPanel.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
