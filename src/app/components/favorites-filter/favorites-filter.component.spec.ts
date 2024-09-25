import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FavoritesFilterComponent } from './favorites-filter.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('FavoritesFilterComponent', () => {
  let component: FavoritesFilterComponent;
  let fixture: ComponentFixture<FavoritesFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesFilterComponent, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event after debounce time', fakeAsync(() => {
    spyOn(component.search, 'emit');

    component.query = 'filter search';
    component.onInputChange();

    tick(1500);

    expect(component.search.emit).toHaveBeenCalledWith('filter search');
  }));

  it('should emit search event immediately on button click', () => {
    spyOn(component.search, 'emit');

    component.query = 'immediate filter';
    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(component.search.emit).toHaveBeenCalledWith('immediate filter');
  });

  it('should apply filter when filter selection changes', () => {
    spyOn(component, 'applyFilter');

    const selectElement = fixture.debugElement.query(
      By.css('select')
    ).nativeElement;

    selectElement.value = 'mostTags';
    selectElement.dispatchEvent(new Event('change'));

    expect(component.applyFilter).toHaveBeenCalled();
    expect(component.selectedFilter).toBe('mostTags');
  });
});
