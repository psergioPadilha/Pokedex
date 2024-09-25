import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { PokeApiService } from './services/poke-api.service';
import { Pokemon } from './models/pokemon';
import { NgClass, NgForOf } from '@angular/common';
import { converterParaTitleCase } from './util/converter-para-title-case';
import { TipoPokemon } from './models/tipo-pokemon';
import { CoresBackgroundTipoPokemon } from './models/cores-background-tipo-pokemon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, NgForOf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  public pokemons: Pokemon[];

  public coresBackgroundTipoPokemon: CoresBackgroundTipoPokemon = {
    Normal: 'fundo-tipo-normal',
    Fire: 'fundo-tipo-fogo',
    Water: 'fundo-tipo-agua',
    Electric: 'fundo-tipo-eletrico',
    Ice: 'fundo-tipo-gelo',
    Grass: 'fundo-tipo-grama',
    Bug: 'fundo-tipo-inseto',
    Poison: 'fundo-tipo-veneno',
    Flying: 'fundo-tipo-voador',
    Ground: 'fundo-tipo-terra',
    Rock: 'fundo-tipo-pedra',
    Fighting: 'fundo-tipo-lutador',
    Psychic: 'fundo-tipo-psiquico',
    Ghost: 'fundo-tipo-fantasma',
    Dark: 'fundo-tipo-sombrio',
    Fairy: 'fundo-tipo-fada',
    Steel: 'fundo-tipo-aco',
  }

  constructor(private pokeApiService: PokeApiService) {
    this.pokemons = [];
  }

  ngOnInit(): void {
    this.pokeApiService.selecionarTodos().subscribe(( res ) => {
      const arrayResultados = res.results as any[];

      for(let resultado of arrayResultados){
        this.pokeApiService.selecionarDetalhesPorUrl(resultado.url).subscribe((detalhes: any) =>{
          const pokemon = this.mapearPokemon(detalhes)

          this.pokemons.push(pokemon);
        });
      }
    });
  }

  private mapearPokemon(obj: any): Pokemon {
    return {
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      tipos: obj.types.map(this.mapearTipoPokemon),
    };
  }

  private mapearTipoPokemon(obj: any): TipoPokemon {
    return { nome: converterParaTitleCase(obj.type.name) };
  }
}
