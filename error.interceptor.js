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
exports.ErrorInterceptor = void 0;
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let ErrorInterceptor = (() => {
    let _classDecorators = [(0, core_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var ErrorInterceptor = _classThis = class {
        constructor(snackBar) {
            this.snackBar = snackBar;
        }
        intercept(request, next) {
            return next.handle(request).pipe((0, operators_1.catchError)((error) => {
                var _a;
                let errorMessage = 'Ocurrió un error inesperado. Por favor, intente de nuevo.';
                if (error.status === 0) {
                    // Error de red o del lado del cliente.
                    errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión a internet.';
                }
                else if ((_a = error.error) === null || _a === void 0 ? void 0 : _a.violations) {
                    // Captura de errores de validación específicos de Quarkus.
                    errorMessage = error.error.violations.map((v) => v.message).join('\n');
                }
                else {
                    // Errores del lado del servidor.
                    switch (error.status) {
                        case 401:
                            errorMessage = 'No autorizado. Su sesión puede haber expirado.';
                            // Aquí se podría redirigir al login o refrescar el token.
                            break;
                        case 403:
                            errorMessage = 'Acceso denegado. No tiene permisos para realizar esta acción.';
                            break;
                        case 404:
                            errorMessage = 'El recurso solicitado no fue encontrado.';
                            break;
                        case 500:
                            errorMessage = 'Error interno del servidor. Contacte al administrador.';
                            break;
                    }
                }
                this.snackBar.open(errorMessage, 'Cerrar', {
                    duration: 7000, // Duración más larga para que el usuario pueda leer el error.
                    panelClass: ['mat-toolbar', 'mat-warn'] // Estilo visual de error.
                });
                return (0, rxjs_1.throwError)(() => error);
            }));
        }
    };
    __setFunctionName(_classThis, "ErrorInterceptor");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ErrorInterceptor = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ErrorInterceptor = _classThis;
})();
exports.ErrorInterceptor = ErrorInterceptor;
