"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogFormComponent = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
let CatalogFormComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-catalog-form',
            templateUrl: './catalog-form.component.html',
            styleUrls: ['./catalog-form.component.scss']
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var CatalogFormComponent = _classThis = class {
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
                name: ['', forms_1.Validators.required],
                description: ['', forms_1.Validators.required],
                code: ['', [forms_1.Validators.required, forms_1.Validators.pattern('^[0-9]*$')]]
            });
        }
        checkEditMode() {
            this.route.paramMap.pipe((0, operators_1.switchMap)(params => {
                const id = params.get('id');
                if (id) {
                    this.isEditMode = true;
                    this.itemId = +id;
                    return this.catalogService.getItemById(this.itemId);
                }
                return (0, rxjs_1.of)(null);
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
    __setFunctionName(_classThis, "CatalogFormComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CatalogFormComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CatalogFormComponent = _classThis;
})();
exports.CatalogFormComponent = CatalogFormComponent;
