import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the loading indicator when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('.loading'));
    expect(loadingElement).toBeTruthy();
  });

  it('should display the books when isLoading is false and books are present', () => {
    component.isLoading = false;
    component.filteredBooks = [
      {
        id: '1',
        volumeInfo: {
          title: 'Test Book',
          authors: ['Author'],
          description: 'Test Description',
          imageLinks: { thumbnail: 'test-thumbnail-url' },
        },
      },
    ];
    fixture.detectChanges();

    const bookCards = fixture.debugElement.queryAll(By.css('app-book-card'));
    expect(bookCards.length).toBe(1);
  });

  it('should display the empty message when there are no books', () => {
    component.isLoading = false;
    component.filteredBooks = [];
    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('.div-final'));
    expect(emptyMessage).toBeTruthy();
  });

  it('should call onSearch when the search event is emitted', () => {
    spyOn(component, 'onSearch');

    const filterComponent = fixture.debugElement.query(
      By.css('app-favorites-filter')
    );
    filterComponent.triggerEventHandler('search', 'test query');

    expect(component.onSearch).toHaveBeenCalledWith('test query');
  });

  it('should call onFilterChange when the filterApplied event is emitted', () => {
    spyOn(component, 'onFilterChange');

    const filterComponent = fixture.debugElement.query(
      By.css('app-favorites-filter')
    );
    filterComponent.triggerEventHandler('filterApplied', 'bestRated');

    expect(component.onFilterChange).toHaveBeenCalledWith('bestRated');
  });
});
