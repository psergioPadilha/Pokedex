import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokeApiService } from '../../services/poke-api.service';

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss'
})
export class DetalhesComponent implements OnInit {
  id?: number;

  constructor(private route: ActivatedRoute, private pokeApiService: PokeApiService) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if(!this.id)
      return;

    this.pokeApiService.selecionarDetalhesPorId(this.id).subscribe((respostaDetalhes) => {});
  }
}
