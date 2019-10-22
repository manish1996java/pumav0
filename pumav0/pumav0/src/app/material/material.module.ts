import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatInputModule } from '@angular/material'

const materials = [
  MatButtonModule,
  MatDialogModule,
  MatInputModule
]


@NgModule({
  imports: materials,
  exports: materials
})
export class MaterialModule { }
