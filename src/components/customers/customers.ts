/**
 * Componente Customers - Dashboard per visualizzare i clienti
 * Questo è un componente "smart" perché:
 * - Chiama API tramite service
 * - Gestisce lo stato dell'applicazione
 * - Ha logica di business
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Per [(ngModel)]
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

/**
 * @Component decorator
 */
@Component({
  selector: 'app-customers',  // Tag HTML: <app-customers></app-customers>
  imports: [CommonModule, FormsModule],    // FormsModule per usare [(ngModel)]
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']
})
export class CustomersComponent implements OnInit {
  
  /**
   * Array che conterrà la lista dei customers dall'API
   * Inizialmente vuoto, verrà popolato da loadCustomers()
   */
  customers: Customer[] = [];

  /**
   * Flag per indicare se i dati stanno caricando
   * Quando è true, mostriamo uno spinner di caricamento
   * Quando è false, mostriamo i dati
   */
  isLoading = true;

  /**
   * Messaggio di errore (se presente)
   * Se non c'è errore, è stringa vuota
   * Se c'è errore, contiene il messaggio da mostrare
   */
  errorMessage = '';

  /**
   * Customer selezionato per il dettaglio
   * Quando clicchi su una card, questo si popola
   * null = nessun customer selezionato
   */
  selectedCustomer: Customer | null = null;

  /**
   * Termine di ricerca per filtrare i customers
   * Inizialmente vuoto (mostra tutti i customers)
   */
  searchTerm = '';

  /**
   * Constructor - Dependency Injection
   * Angular inietta automaticamente il CustomerService
   * 
   * @param customerService - Service per chiamate API customers
   */
  constructor(private customerService: CustomerService) {
    console.log('🏗️ CustomersComponent constructor called');
  }

  /**
   * ngOnInit - Lifecycle Hook
   * Viene chiamato DOPO che Angular ha creato il componente
   * È il posto perfetto per caricare dati dall'API
   * 
   * Simile a componentDidMount in React
   */
  ngOnInit(): void {
    console.log('🎬 CustomersComponent initialized');
    this.loadCustomers();
  }

  /**
   * Metodo per caricare i customers dall'API
   * Usa il CustomerService per fare la chiamata HTTP
   */
  loadCustomers(): void {
    console.log('📡 Loading customers from API...');
    
    // Reset stato
    this.isLoading = true;
    this.errorMessage = '';

    /**
     * subscribe() è come .then() per le Promise
     * Ma in RxJS si chiama subscribe invece di then
     * 
     * Sintassi:
     * observable.subscribe({
     *   next: (data) => {},   // Quando arrivano dati
     *   error: (err) => {},   // Quando c'è un errore
     *   complete: () => {}    // Quando l'Observable è completo (opzionale)
     * })
     */
    this.customerService.getAllCustomers().subscribe({
      // next - chiamato quando l'API risponde con successo
      next: (data: Customer[]) => {
        console.log('✅ Customers loaded successfully:', data.length);
        this.customers = data;
        this.isLoading = false;
      },
      
      // error - chiamato quando c'è un errore (network, 404, 500, ecc.)
      error: (error: any) => {
        console.error('❌ Error loading customers:', error);
        this.errorMessage = 'Failed to load customers. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Metodo per selezionare un customer e mostrarne i dettagli
   * Chiamato quando clicchi su una card
   * 
   * @param customer - Il customer cliccato
   */
  viewCustomerDetails(customer: Customer): void {
    console.log('👁️ Viewing details for customer:', customer.customerId);
    this.selectedCustomer = customer;
  }

  /**
   * Metodo per chiudere il modal dei dettagli
   * Resetta selectedCustomer a null
   */
  closeDetails(): void {
    console.log('❌ Closing customer details');
    this.selectedCustomer = null;
  }

  /**
   * Getter (proprietà calcolata) per filtrare i customers
   * Filtra in base al searchTerm
   * 
   * Cerca in: firstName, lastName, companyName, emailAddress
   * 
   * @returns Array di customers filtrati
   */
  get filteredCustomers(): Customer[] {
    // Se searchTerm è vuoto, ritorna tutti i customers
    if (!this.searchTerm.trim()) {
      return this.customers;
    }

    // Converte searchTerm in lowercase per ricerca case-insensitive
    const term = this.searchTerm.toLowerCase();

    // Filtra l'array customers
    return this.customers.filter(customer => 
      // Cerca in firstName
      customer.firstName.toLowerCase().includes(term) ||
      // Cerca in lastName
      customer.lastName.toLowerCase().includes(term) ||
      // Cerca in companyName (se presente)
      (customer.companyName && customer.companyName.toLowerCase().includes(term)) ||
      // Cerca in emailAddress
      customer.emailAddress.toLowerCase().includes(term)
    );
  }

  /**
   * Metodo per ricaricare i customers
   * Utile per un bottone "refresh"
   */
  refresh(): void {
    console.log('🔄 Refreshing customers...');
    this.loadCustomers();
  }
}

/**
 * LIFECYCLE HOOKS IN ANGULAR:
 * 
 * 1. ngOnChanges() - quando cambiano gli @Input
 * 2. ngOnInit() - dopo il primo ngOnChanges (chiamato UNA VOLTA)
 * 3. ngDoCheck() - ad ogni change detection
 * 4. ngAfterContentInit() - dopo che il content è stato proiettato
 * 5. ngAfterContentChecked() - dopo ogni check del content
 * 6. ngAfterViewInit() - dopo che la view è stata inizializzata
 * 7. ngAfterViewChecked() - dopo ogni check della view
 * 8. ngOnDestroy() - prima che il componente venga distrutto
 * 
 * I più usati:
 * - ngOnInit: carica dati
 * - ngOnDestroy: cleanup (unsubscribe, timer, ecc.)
 * 
 * GETTER vs METODO:
 * 
 * Getter (proprietà calcolata):
 * get nomeProprietà() { return valore; }
 * Uso: {{ nomeProprietà }} (senza parentesi)
 * 
 * Metodo normale:
 * nomeMetodo() { return valore; }
 * Uso: {{ nomeMetodo() }} (con parentesi)
 * 
 * I getter sono meglio per valori derivati/calcolati!
 */