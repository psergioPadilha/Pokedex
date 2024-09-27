import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CoresBackgroundTipoPokemon } from '../../models/cores-background-tipo-pokemon';
import { PokeApiService } from '../../services/poke-api.service';
import { converterParaTitleCase } from '../../util/converter-para-title-case';
import { NgClass, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { mapearTipoPokemon } from '../../util/mapear-tipo-pokemon';
import { CardPokemonComponent } from "./card-pokemon/card-pokemon.component";

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [NgForOf, NgClass, RouterLink, CardPokemonComponent],
  templateUrl: './listagem.component.html'
})
export class ListagemComponent implements OnInit {
  public pokemons: Pokemon[];
  private offsetPaginacao: number;

  constructor(private pokeApiService: PokeApiService) {
    this.pokemons = [];
    this.offsetPaginacao = 0;
  }

  public ngOnInit(): void {
    this.obterPokemons();
  }

  public buscarMaisResultados(): void {
    this.offsetPaginacao += 20;

    this.obterPokemons();
  }

  private obterPokemons() {
    this.pokeApiService.selecionarTodos(this.offsetPaginacao).subscribe(( res ) => {
      const arrayResultados = res.results as any[];

      for(let resultado of arrayResultados){
        this.pokeApiService.selecionarDetalhesPorUrl(resultado.url).subscribe((detalhes: any) =>{
          const pokemon = this.mapearPokemon(detalhes)

          this.pokemons.push(pokemon);
        });
      }

      this.pokemons.sort((p) => p.id);
    });
  }

  private mapearPokemon(obj: any): Pokemon {
    return {
      id: obj.id,
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.other.dream_world.front_default,
      tipos: obj.types.map(mapearTipoPokemon),
    };
  }
}
