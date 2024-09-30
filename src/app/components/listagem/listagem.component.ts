import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CoresBackgroundTipoPokemon } from '../../models/cores-background-tipo-pokemon';
import { PokeApiService } from '../../services/poke-api.service';
import { converterParaTitleCase } from '../../util/converter-para-title-case';
import { NgClass, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { mapearTipoPokemon } from '../../util/mapear-tipo-pokemon';
import { CardPokemonComponent } from "./card-pokemon/card-pokemon.component";
import { StatusFavoritoPokemon } from '../../models/status-favorito-pokemon';
import { PokemonsFavoritosComponent } from "./pokemons-favoritos/pokemons-favoritos.component";
import { LocalStorageService } from '../../services/local-storage.service';
import { BuscaComponent } from "../busca/busca.component";

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [NgForOf, NgClass, RouterLink, CardPokemonComponent, PokemonsFavoritosComponent, BuscaComponent],
  templateUrl: './listagem.component.html'
})

export class ListagemComponent implements OnInit {
  public pokemons: Pokemon[];
  private offsetPaginacao: number;
  public pokemonsFavoritos: Pokemon[];
  public buscaRealizada: boolean = false;

  constructor(private pokeApiService: PokeApiService, private localStorageService: LocalStorageService) {
    this.pokemons = [];
    this.pokemonsFavoritos = [];
    this.offsetPaginacao = 0;
  }

  public ngOnInit(): void {
    this.obterPokemons();
    this.pokemonsFavoritos = this.localStorageService.obterFavoritos();
  }

  public buscarMaisResultados(): void {
    this.offsetPaginacao += 20;

    this.obterPokemons();
  }

  public filtrarPokemons(textoFiltro: string): void {
    this.buscaRealizada = true;

    this.pokemons = this.pokemons.filter((p) => {
      return p.nome.toLowerCase().includes(textoFiltro.toLowerCase());
    });
  }

  public limparFiltro() {
    this.buscaRealizada = false;
    this.pokemons = [];
    this.obterPokemons();
  }

  public alternarStastusFavorito(status: StatusFavoritoPokemon) {
    if (status.statusFavorito == true) {
      this.pokemonsFavoritos.push(status.pokemon);
    } else {
      this.pokemonsFavoritos = this.pokemonsFavoritos.filter((p) => p.id != status.pokemon.id);
    }
    status.pokemon.favorito = !status.pokemon.favorito;

    this.localStorageService.salvarFavoritos(this.pokemonsFavoritos);
  }

  private obterPokemons() {
    this.pokeApiService.selecionarTodos(this.offsetPaginacao).subscribe(( res ) => {
      const arrayResultados = res.results as any[];

      for(let resultado of arrayResultados){
        this.pokeApiService.selecionarDetalhesPorUrl(resultado.url).subscribe((objdetalhes: any) =>{
          const pokemon = this.mapearPokemon(objdetalhes)

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
      favorito: this.pokemonsFavoritos.some((p) => p.id == obj.id),
    };
  }
}
