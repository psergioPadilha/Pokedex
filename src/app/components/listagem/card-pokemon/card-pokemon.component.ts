import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CoresBackgroundTipoPokemon } from '../../../models/cores-background-tipo-pokemon';
import { Pokemon } from '../../../models/pokemon';
import { StatusFavoritoPokemon } from '../../../models/status-favorito-pokemon';

@Component({
  selector: 'app-card-pokemon',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf, RouterLink],
  templateUrl: './card-pokemon.component.html',
  styleUrl: './card-pokemon.component.scss'
})

export class CardPokemonComponent {

  @Input( { required: true } ) pokemon?: Pokemon;
  @Output() statusFavoritoAlterado: EventEmitter<StatusFavoritoPokemon>;

  constructor() {
    this.statusFavoritoAlterado = new EventEmitter();
  }

  onFavoritarPokemon(pokemon: Pokemon): void {
    this.statusFavoritoAlterado.emit({
      pokemon: pokemon,
      statusFavorito: true,
    });
  }

  onDesfavoritarPokemon(pokemon: Pokemon): void {
    this.statusFavoritoAlterado.emit({
      pokemon: pokemon,
      statusFavorito: false,
    });
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
}
