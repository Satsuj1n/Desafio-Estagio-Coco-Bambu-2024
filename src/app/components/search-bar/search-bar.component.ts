import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Subject,
  Subscription,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs'; // 4 operadores RxJS

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  imports: [FormsModule],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  query: string = '';
  @Output() search = new EventEmitter<string>(); // O tipo é string

  onSearch() {
    this.search.emit(this.query); // Emitindo a string digitada
  }
  private searchSubject = new Subject<string>();
  private subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.searchSubject
      .pipe(debounceTime(1500), distinctUntilChanged())
      .subscribe((query) => {
        this.search.emit(query);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onInputChange() {
    this.searchSubject.next(this.query);
  }
}
