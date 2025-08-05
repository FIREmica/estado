var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';
import { CatalogFormComponent } from './components/catalog-form/catalog-form.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { TextFieldModule } from '@angular/cdk/text-field';
let CatalogModule = class CatalogModule {
};
CatalogModule = __decorate([
    NgModule({
        declarations: [
            CatalogListComponent,
            CatalogFormComponent,
            ConfirmationDialogComponent
        ],
        imports: [
            CommonModule,
            CatalogRoutingModule,
            ReactiveFormsModule,
            // Material
            MatButtonModule,
            MatDialogModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatSnackBarModule,
            MatTableModule,
            TextFieldModule,
        ]
    })
], CatalogModule);
export { CatalogModule };
