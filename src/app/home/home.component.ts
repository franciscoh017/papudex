import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pokemons: any[];
  selected: any;

  start: number = 1;
  end: number = 151;
  isModalActive: boolean = false;

  

  constructor(private _http : HttpService) { }

  ngOnInit() {
    interface selected {
      name ?: string;
      id ?: string;
      height ?: string;
      weight ?: string;

    }

    this._http.getPokemons().subscribe (data => {
      this.pokemons = data["results"];
      this.pokemons.forEach(pokemon => {
        this.addPokemonId(pokemon);
      });
    });
  }

  addPokemonId(pokemon){
    pokemon.id = pokemon.url.substring(34,37).replace(/\D/g,'');
  }

  search() {
    if (this.end > 807)
      this.end = 807;
    
    if(this.start < 1)
      this.start = 1;

    this._http.search(this.start,this.end).subscribe (data => {
      this.pokemons = data["results"];
      this.pokemons.forEach(pokemon => {
        this.addPokemonId(pokemon);
      });
    })
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  selectPokemon(id){
    this.selected = {};
    this._http.getPokemon(id).subscribe (data => {
      this.selected = data;
    });
    this.toggleModal();
  }

}
