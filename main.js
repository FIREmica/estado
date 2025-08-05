// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { appConfig } from './app.config'; // Asegúrate de importar la configuración
bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
