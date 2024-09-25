import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private readonly url = "https://pokeapi.co/api/v2/pokemon/";

  constructor(private http: HttpClient) { }

  public selecionarTodos(): Observable<any>{
    return this.http.get(this.url);
  }

  public selecionarDetalhesPorUrl(url: string): Observable<any>{
    return this.http.get<any>(url);
  }
}
