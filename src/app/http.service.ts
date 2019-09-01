import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http : HttpClient) { }

  getPokemons() {
    return this.http.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  }

  search(from,to) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${to-from+1}&offset=${from-1}`);
  }

  getPokemon(id){
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }
}
