import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [FormsModule],
})
export class SearchBarComponent {
  query: string = '';
  @Output() search = new EventEmitter<string>(); // O tipo é string

  onSearch() {
    this.search.emit(this.query); // Emitindo a string digitada
  }
}
