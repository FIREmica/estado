import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';
import { CatalogFormComponent } from './components/catalog-form/catalog-form.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogListComponent
  },
  {
    path: 'new',
    component: CatalogFormComponent
  },
  {
    path: 'edit/:id',
    component: CatalogFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }