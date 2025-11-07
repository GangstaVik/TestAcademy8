/**
 * App Component - Componente radice dell'applicazione
 * Questo è il componente PRINCIPALE che contiene tutti gli altri
 * 
 * Struttura:
 * - Navbar (in alto)
 * - Contenuto principale (customers, products, ecc.)
 * - Footer (in basso)
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Import dei nostri componenti custom
import { NavbarComponent } from '../components/navbar/navbar';
import { FooterComponent } from '../components/footer/footer';
import { CustomersComponent } from '../components/customers/customers'
import { CustomerService } from '../services/customer.service';

/**
 * @Component decorator
 * Definisce le proprietà del componente App
 */
@Component({
  selector: 'app-root',  // Selettore usato in index.html: <app-root></app-root>
  
  /**
   * imports - Array di moduli e componenti da importare
   * 
   * IMPORTANTE: Angular 17+ usa "standalone components"
   * Non serve più NgModule, importi direttamente qui!
   */
  imports: [
    CommonModule,        // Direttive comuni (*ngIf, *ngFor, pipes, ecc.)
    HttpClientModule,    // Per fare chiamate HTTP
    NavbarComponent,     // Il nostro componente navbar
    FooterComponent,     // Il nostro componente footer
    CustomersComponent   // Il nostro componente customers
  ],
  
  templateUrl: './app.html',  // File HTML
  styleUrls: ['./app.css']    // File CSS
})
export class App {
  
  /**
   * Titolo dell'applicazione
   * Viene usato nella navbar e nel title del browser */
  title = 'BikeCom';
  // retrieve the value of active customers using the method in the service
  // which uses the api to fetch the n of active custs
  active_customers: number;
  active_prods: number;

  constructor(private CustomerService: CustomerService) { }

  ngOnInit() {
    this.CustomerService.countCusts().subscribe(count => {
      this.active_customers = count;
    });
    this.CustomerService.countProds().subscribe(c => {
      this.active_prods = c;
    });
  }
  /**
   * Flag per sapere quale vista mostrare
   * 'home' | 'customers' | 'products'
   * 
   * Inizialmente mostriamo la home
   */
  currentView: string = 'home';

  /**
   * Constructor
   * In questo caso vuoto perché non abbiamo dependency injection
   * ma lo lasciamo per mostrare la struttura corretta
  constructor(private customerService: CustomerService) {
    console.log('🚀 App Component initialized');
    console.log('📱 Current view:', this.currentView);
    this.customerService.getActiveCustomersCount().subscribe(count => {
      this.active_customers = count;
    });
    console.log('📱 Current view:', this.currentView);
  }

  /**
   * Metodo per cambiare vista
   * Chiamato dai link della navbar
   * 
   * @param view - Nome della vista da mostrare
   */
  changeView(view: string): void {
    console.log('🔄 Changing view to:', view);
    this.currentView = view;
  }
}

/**
 * NOTA IMPORTANTE SU ANGULAR STANDALONE COMPONENTS:
 * 
 * Prima di Angular 17:
 * - Dovevi creare NgModule
 * - Dichiarare componenti in declarations
 * - Importare moduli in imports
 * 
 * Da Angular 17+:
 * - I componenti sono standalone di default
 * - Non servono più NgModule
 * - Importi direttamente nel @Component decorator
 * 
 * Questo rende il codice più semplice e modulare!
 * 
 * STRUTTURA APP:
 * 
 * App (root)
 * ├── Navbar (sempre visibile)
 * ├── Contenuto (cambia in base a currentView)
 * │   ├── Home
 * │   ├── Customers
 * │   └── Products
 * └── Footer (sempre visibile)
 */