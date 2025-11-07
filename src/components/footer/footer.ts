/**
 * Componente Footer - Piè di pagina condiviso
 * Questo componente sarà presente in TUTTE le pagine dell'applicazione
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @Component decorator che definisce le proprietà del componente
 */
@Component({
  selector: 'app-footer',  // Tag HTML: <app-footer></app-footer>
  imports: [CommonModule], // Importa CommonModule per direttive comuni
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  
  /**
   * Anno corrente - calcolato automaticamente
   * new Date().getFullYear() ritorna l'anno corrente (es: 2025)
   * Così il copyright si aggiorna automaticamente ogni anno!
   */
  currentYear: number = new Date().getFullYear();

  /**
   * Nome dell'applicazione
   * Cambialo come preferisci!
   */
  appName = 'BikeCom';

  /**
   * Informazioni aziendali
   * Puoi aggiungere altre proprietà come:
   * - address: indirizzo fisico
   * - email: email di contatto
   * - phone: numero di telefono
   */
  companyInfo = {
    name: 'BikeCom Inc.',
    email: 'info@bikecom.com',
    phone: '+39 123 456 7890'
  };

  /**
   * Array di link social media
   * Ogni oggetto contiene:
   * - name: nome del social
   * - icon: classe icona FontAwesome
   * - url: link al profilo social
   */
  socialLinks = [
    { 
      name: 'Facebook', 
      icon: 'fa-facebook-f', 
      url: 'https://facebook.com' 
    },
    { 
      name: 'Twitter', 
      icon: 'fa-twitter', 
      url: 'https://twitter.com' 
    },
    { 
      name: 'Instagram', 
      icon: 'fa-instagram', 
      url: 'https://instagram.com' 
    },
    { 
      name: 'LinkedIn', 
      icon: 'fa-linkedin-in', 
      url: 'https://linkedin.com' 
    }
  ];

  /**
   * Array di link utili per il footer
   * Questi sono i classici link che trovi in fondo ai siti
   */
  footerLinks = [
    { label: 'About Us', route: '/about' },
    { label: 'Privacy Policy', route: '/privacy' },
    { label: 'Terms of Service', route: '/terms' },
    { label: 'Contact', route: '/contact' }
  ];

  /**
   * Metodo chiamato quando si clicca su un social link
   * Apre il link in una nuova tab
   * 
   * @param url - URL del social media
   */
  openSocialLink(url: string): void {
    console.log('🔗 Opening social link:', url);
    // window.open apre un nuovo tab del browser
    window.open(url, '_blank');
  }

  /**
   * Metodo per scrollare in cima alla pagina
   * Utile per i "back to top" buttons
   */
  scrollToTop(): void {
    console.log('⬆️ Scrolling to top');
    // window.scrollTo scorre la pagina
    window.scrollTo({
      top: 0,           // Posizione Y (in alto)
      behavior: 'smooth' // Animazione fluida
    });
  }
}

/**
 * NOTA: Componente Footer
 * 
 * Il footer è un componente "presentazionale" (presentational component)
 * cioè si occupa solo di mostrare informazioni, non ha logica complessa
 * 
 * Differenze con componenti "smart":
 * - Presentational: solo UI, pochi metodi
 * - Smart: logica di business, chiamate API, gestione stato
 * 
 * Il footer è perfetto come presentational component!
 */