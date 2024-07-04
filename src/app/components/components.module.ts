import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './admin-components/footer/footer.component';
import {
  MessageNotfoundFullFolderComponent,
} from './message-notfound-full-folder/message-notfound-full-folder.component';

@NgModule({
  declarations: [
    FooterComponent,
    MessageNotfoundFullFolderComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FooterComponent,
  ]
})
export class ComponentsModule { }
