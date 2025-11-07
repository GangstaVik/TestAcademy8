/**
 * Interface che definisce la struttura di un Customer
 * Questo è il "contratto" che ci dice come sono fatti i dati del customer
 * Simile a una classe C# ma senza metodi, solo proprietà
 */
export interface Customer {
  customerId: number;        // ID univoco del customer
  firstName: string;         // Nome del customer
  lastName: string;          // Cognome del customer
  companyName?: string;      // Nome azienda (opzionale, indicato da ?)
  emailAddress: string;      // Email del customer
  phone?: string;            // Telefono (opzionale)
}

/**
 * NOTA: Il ? dopo il nome della proprietà significa che è OPZIONALE
 * Esempio: companyName?: string
 * Questo permette di avere customer con o senza companyName
 */