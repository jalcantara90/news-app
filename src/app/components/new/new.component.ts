import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { ActionSheetController, Platform } from '@ionic/angular';

// Native plugins
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

// Interfaces
import { ActionSheetButton } from '@ionic/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {

  @Input() public index: number;
  @Input() public new: Article = null;
  @Input() private inFab: boolean;

  constructor(
    private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialShr: SocialSharing,
    private dataLocalService: DataLocalService,
    private platform: Platform
  ) { }

  ngOnInit(): void {}

  openNew(): void {
    this.iab.create(this.new.url, 'system');
  }

  async showMenu(): Promise<void> {

    let saveDeleteBtn: ActionSheetButton;

    if ( this.inFab ) {
      saveDeleteBtn = {
        text: 'Eliminar favoritos',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.deleteNew( this.new );
        }
      };
    } else {
      saveDeleteBtn = {
        text: 'Añadir a favoritos',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.saveNew( this.new );
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => this.shareNew()
      }, saveDeleteBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }


  public shareNew(): void {

    if (this.platform.is('cordova')) {
      this.socialShr.share(
        this.new.title,
        this.new.source.name,
        '',
        this.new.url
      );
    } else if (navigator['share']) {
      navigator['share']({
          title: this.new.title,
          text: this.new.source.name,
          url: this.new.url,
      })
      .then(() => console.log('Successful share'))
      .catch((error: any) => console.log('Error sharing', error));
    } else {
      console.error('Compartir no soportado.');
    }

  }
}
