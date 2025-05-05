import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

//!SE usa para intentar extraer la logica del homa page

@Injectable({ providedIn: 'root' })
export class PaginationService {
  ActivatedRoute = inject(ActivatedRoute);

  // Este es el observable que nos va a ayudar a obtener los productos por pagina
  courrentPage = toSignal(
    this.ActivatedRoute.queryParamMap.pipe(
      map((params) => (params.get('page') ? +params.get('page')! : 1)),
      map((page) => (isNaN(page) ? 1 : page)) // Este map es el quehace que si el usuario introduce un valor no numerico se le asigne el valor 1 que sera la apgina que s emostrara
    ),

    {
      initialValue: 1, // valor inicial
    }
  );
}
