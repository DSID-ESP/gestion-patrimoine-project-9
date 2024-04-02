import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecteurActiviteListeComponent } from './secteur-activite-liste.component';

describe('SecteurActiviteListeComponent', () => {
  let component: SecteurActiviteListeComponent;
  let fixture: ComponentFixture<SecteurActiviteListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecteurActiviteListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecteurActiviteListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
