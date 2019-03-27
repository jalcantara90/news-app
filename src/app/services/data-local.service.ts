import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public news: Article[] = [];
  constructor(
    private storage: Storage,
    public toastController: ToastController
  ) {
    this.loadFabNews();
  }

  async presentToast( message: string ): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  saveNew( newToSave: Article ): void {

    const exists = this.news.find( item => item.title === newToSave.title);

    if ( !exists ) {
      this.news.unshift( newToSave );
      this.storage.set('faborites', this.news);

      this.presentToast('Noticia guardada en favoritos');
    }
  }

  async loadFabNews(): Promise<void> {

    const faborites = await this.storage.get('faborites');

    if (faborites) {
      this.news = faborites;
    }
  }

  deleteNew( newToDelete: Article ) {
    this.news = this.news.filter( item => item.title !== newToDelete.title );
    this.storage.set('faborites', this.news);
    this.presentToast('Noticia eliminada de favoritos');
  }
}
