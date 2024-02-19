import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, count, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) {}

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError(() => of([]))
      // delay(2000)
    );
  }

  searchArea(code: string, area: string): Observable<Country[]> {
    const url = `${this.apiUrl}/${area}/${code}`;
    return this.getCountriesRequest(url);
  }

  searchCountryByAlphaCode(term: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${term}`;

    return this.httpClient.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError(() => of(null))
    );
  }
}
