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
  MatTabsModule,
  MatSnackBarModule,
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
  MatSnackBarModule,
];

@NgModule({
  imports: modules,
  exports: modules,
  declarations: []
})
export class MaterialModule {
}
