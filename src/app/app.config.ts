/**
 * Configurazione dell'applicazione Angular
 * Questo file configura i providers e le impostazioni globali
 */

import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

/**
 * appConfig - Configurazione principale dell'app
 * 
 * providers: array di servizi e configurazioni da fornire all'app
 * 
 * provideHttpClient(): provider per HttpClient
 * Necessario per fare chiamate HTTP nell'app
 * Senza questo, CustomerService non funzionerebbe!
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Fornisce HttpClient a tutta l'applicazione
    provideHttpClient()
    
    /**
     * Altri provider che potresti aggiungere:
     * 
     * - provideRouter(routes): per il routing
     * - provideAnimations(): per le animazioni
     * - { provide: 'API_URL', useValue: 'https://api.example.com' }: costanti
     * - MyCustomService: servizi custom
     */
  ]
};

/**
 * NOTA SULLA DEPENDENCY INJECTION:
 * 
 * In Angular, i servizi vengono "iniettati" nei componenti
 * tramite il sistema di Dependency Injection (DI).
 * 
 * Ci sono 3 modi per fornire un servizio:
 * 
 * 1. providedIn: 'root' (nel servizio stesso)
 *    @Injectable({ providedIn: 'root' })
 *    → Il servizio è un singleton disponibile ovunque
 * 
 * 2. Nel providers array del componente
 *    @Component({ providers: [MyService] })
 *    → Una nuova istanza per ogni componente
 * 
 * 3. Nel providers array di appConfig (questo file)
 *    providers: [MyService]
 *    → Disponibile a tutta l'app
 * 
 * Il nostro CustomerService usa providedIn: 'root',
 * quindi non serve aggiungerlo qui!
 */