import { NgModule } from '@angular/core';
import {
  MdButtonModule,
  MatInputModule,
  MdFormFieldModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatTabsModule
} from '@angular/material';

const modules = [
  MdButtonModule,
  MdFormFieldModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatTabsModule,
];

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule {
}
