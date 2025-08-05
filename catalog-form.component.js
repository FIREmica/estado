var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
let CatalogFormComponent = class CatalogFormComponent {
    constructor(fb, catalogService, router, route, snackBar) {
        this.fb = fb;
        this.catalogService = catalogService;
        this.router = router;
        this.route = route;
        this.snackBar = snackBar;
        this.isEditMode = false;
        this.itemId = null;
    }
    ngOnInit() {
        this.initForm();
        this.checkEditMode();
    }
    initForm() {
        this.itemForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            code: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
        });
    }
    checkEditMode() {
        this.route.paramMap.pipe(switchMap(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode = true;
                this.itemId = +id;
                return this.catalogService.getItemById(this.itemId);
            }
            return of(null);
        })).subscribe(item => {
            if (item) {
                this.itemForm.patchValue(item);
            }
        });
    }
    onSubmit() {
        if (this.itemForm.invalid) {
            return;
        }
        const operation = this.isEditMode
            ? this.catalogService.updateItem(this.itemId, this.itemForm.value)
            : this.catalogService.createItem(this.itemForm.value);
        operation.subscribe({
            next: () => {
                this.snackBar.open('Operación exitosa', 'Cerrar', { duration: 3000 });
                this.router.navigate(['/catalog']);
            },
            error: () => {
                this.snackBar.open('Error en la operación', 'Cerrar', { duration: 3000 });
            }
        });
    }
};
CatalogFormComponent = __decorate([
    Component({
        selector: 'app-catalog-form',
        templateUrl: './catalog-form.component.html',
        styleUrls: ['./catalog-form.component.scss']
    })
], CatalogFormComponent);
export { CatalogFormComponent };
