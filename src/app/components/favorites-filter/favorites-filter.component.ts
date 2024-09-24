import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-filter',
  standalone: true,
  templateUrl: './favorites-filter.component.html',
  styleUrls: ['./favorites-filter.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class FavoritesFilterComponent {
  @Output() search = new EventEmitter<string>();
  @Output() filterApplied = new EventEmitter<string>();

  query: string = '';
  selectedFilter: string = 'bestRated';

  onSearch() {
    this.search.emit(this.query);
  }

  applyFilter() {
    this.filterApplied.emit(this.selectedFilter);
  }

  onInputChange() {
    this.onSearch();
  }
}
