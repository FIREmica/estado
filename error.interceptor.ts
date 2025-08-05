import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error inesperado. Por favor, intente de nuevo.';

        if (error.status === 0) {
          // Error de red o del lado del cliente.
          errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión a internet.';
        } else if (error.error?.violations) {
          // Captura de errores de validación específicos de Quarkus.
          errorMessage = error.error.violations.map((v: { message: string }) => v.message).join('\n');
        } else {
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

        return throwError(() => error);
      })
    );
  }
}