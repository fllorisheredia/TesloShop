import {
  Component,
  computed,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  pages = input(0);
  courrentPage = input<number>(1);

  //Esto es para que el componente pueda recibir el numero de paginas y la pagina actual
  activePage = linkedSignal(this.courrentPage);

  //Esto nos ayuda a que si el numero de paginas cambia se le pueda asignar el numero de paginas respectiva
  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });
}
