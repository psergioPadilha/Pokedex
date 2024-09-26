import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { CoresBackgroundTipoPokemon } from '../../models/cores-background-tipo-pokemon';
import { PokeApiService } from '../../services/poke-api.service';
import { converterParaTitleCase } from '../../util/converter-para-title-case';
import { TipoPokemon } from '../../models/tipo-pokemon';
import { NgClass, NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [NgForOf, NgClass, RouterLink],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemComponent implements OnInit {
  public pokemons: Pokemon[];

  constructor(private pokeApiService: PokeApiService) {
    this.pokemons = [];
  }

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
  };

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
      id: obj.id,
      nome: converterParaTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      tipos: obj.types.map(this.mapearTipoPokemon),
    };
  }

  private mapearTipoPokemon(obj: any): TipoPokemon {
    return { nome: converterParaTitleCase(obj.type.name) };
  }
}
