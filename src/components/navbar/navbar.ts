/**
 * Componente Navbar - Barra di navigazione condivisa
 * Questo componente sarà presente in TUTTE le pagine dell'applicazione
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @Component è un decorator che definisce questo come componente Angular
 */
@Component({
  selector: 'app-navbar',  // Tag HTML da usare: <app-navbar></app-navbar>
  imports: [CommonModule], // Moduli necessari (CommonModule per *ngIf, *ngFor, ecc.)
  templateUrl: './navbar.html', // File HTML del template
  styleUrls: ['./navbar.css']   // File CSS dello stile
})
export class NavbarComponent {
  
  /**
   * Proprietà per gestire lo stato del menu mobile (hamburger)
   * Quando è true, il menu è aperto
   * Quando è false, il menu è chiuso
   */
  isMenuOpen = false;

  /**
   * Nome dell'applicazione visualizzato nella navbar
   * Puoi cambiarlo come preferisci!
   */
  appName = 'BikeCom';

  /**
   * Array di link di navigazione
   * Ogni oggetto ha:
   * - label: testo del link
   * - route: dove punta il link
   * - icon: icona FontAwesome da mostrare
   */
  navLinks = [
    { label: 'Home', route: '/', icon: 'fa-home' },
    { label: 'Customers', route: '/customers', icon: 'fa-users' },
    { label: 'Products', route: '/products', icon: 'fa-box' }
  ];

  /**
   * Metodo per aprire/chiudere il menu mobile
   * Inverte il valore di isMenuOpen (true diventa false e viceversa)
   * 
   * Questo è il pattern "toggle" molto comune in Angular
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('📱 Menu mobile toggled:', this.isMenuOpen ? 'OPEN' : 'CLOSED');
  }

  /**
   * Metodo chiamato quando si clicca su un link
   * Chiude automaticamente il menu mobile
   * 
   * @param link - Il link cliccato
   */
  onLinkClick(link: any): void {
    console.log('🔗 Navigating to:', link.route);
    this.isMenuOpen = false; // Chiudi il menu mobile dopo aver cliccato
  }
}

/**
 * NOTA IMPORTANTE:
 * In Angular, quando vuoi usare questo componente in altri componenti,
 * devi:
 * 1. Importarlo nel componente padre
 * 2. Aggiungerlo nell'array imports del @Component decorator
 * 
 * Esempio in app.component.ts:
 * import { NavbarComponent } from './components/navbar/navbar.component';
 * 
 * @Component({
 *   imports: [NavbarComponent, ...altri]
 * })
 */