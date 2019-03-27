import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewListComponent } from './new-list/new-list.component';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [
    NewListComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NewListComponent
  ]
})
export class ComponentsModule { }
