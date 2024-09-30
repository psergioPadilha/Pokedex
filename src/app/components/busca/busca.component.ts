import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [NgIf],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {
  public buscaRealizada: boolean;
  @Output() pesquisaFeita: EventEmitter<string>;
  @Output() limpesaFiltro: EventEmitter<void>;

  constructor(){
    this.buscaRealizada = false;
    this.pesquisaFeita = new EventEmitter();
    this.limpesaFiltro = new EventEmitter();
  }

  public onBuscar(texto: string): void {
    this.buscaRealizada = true;

    this.pesquisaFeita.emit(texto);
  }

  public onLimpar(): void {
    this.buscaRealizada = false;

    this.limpesaFiltro.emit();
  }
}
