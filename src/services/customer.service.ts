/**
 * Service per gestire le chiamate API relative ai Customers
 * I Service in Angular sono classi che gestiscono la logica di business
 * e possono essere iniettati in qualsiasi componente (Dependency Injection)
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

/**
 * @Injectable indica che questo service può essere iniettato
 * providedIn: 'root' significa che è un singleton disponibile in tutta l'app
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  /**
   * URL base della tua API
   * MODIFICA QUESTA URL se la tua API usa una porta diversa!
   */
  private cstUrl = 'https://localhost:7004/api/Customers';
  private prdUrl = 'https://localhost:7004/api/Products';
  /**
   * Constructor - Angular inietta automaticamente HttpClient
   * HttpClient è il modulo Angular per fare chiamate HTTP
   * 
   * @param http - Servizio Angular per fare richieste HTTP
   */
  constructor(private http: HttpClient) {
    console.log('✅ CustomerService initialized');
  }

  /**
   * Metodo per ottenere tutti i customers dall'API
   * 
   * Observable<Customer[]> significa:
   * - Observable: è come una Promise ma più potente (stream di dati)
   * - Customer[]: ritorna un array di Customer
   * 
   * @returns Observable che emette un array di Customer
   */
  getAllCustomers(): Observable<Customer[]> {
    // Costruisco l'URL completo con i parametri di paginazione
    const url = `${this.cstUrl}/AllCustomers?page=1&pageSize=50`;

    console.log('📡 Fetching customers from:', url);

    // http.get ritorna un Observable
    // Angular gestisce automaticamente la deserializzazione JSON
    return this.http.get<Customer[]>(url);
  }

  /**
   * ESEMPIO: Metodo per ottenere un singolo customer per ID
   * Lo lasciamo qui come riferimento per future implementazioni
   * 
   * @param id - ID del customer da recuperare
   * @returns Observable che emette un singolo Customer
   */
  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.cstUrl}/${id}`;
    return this.http.get<Customer>(url);
  }


  // Metodo per ottenere il numero dei customer totali usando l'api annessa così non devo ripetere qua il codice
  countCusts() {
    const url = `${this.cstUrl}/CountCustomers`;
    return this.http.get<number>(url);
  }

    // Metodo per ottenere il numero dei customer totali usando l'api annessa così non devo ripetere qua il codice
  countProds() {
    const url = `${this.prdUrl}/CountProds`;
    return this.http.get<number>(url);
  }

}


/**
 * SPIEGAZIONE OBSERVABLE vs PROMISE:
 * 
 * Promise (JavaScript):
 * - Ritorna UN SOLO valore
 * - Non può essere cancellata
 * 
 * Observable (RxJS):
 * - Può emettere MULTIPLI valori nel tempo
 * - Può essere cancellato (unsubscribe)
 * - Più potente per gestire stream di dati
 * 
 * Esempio uso:
 * this.customerService.getAllCustomers().subscribe({
 *   next: (data) => console.log(data),
 *   error: (err) => console.error(err)
 * });
 */