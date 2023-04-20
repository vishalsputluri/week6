/// <reference types="cypress" />
import { async, TestBed,ComponentFixture } from '@angular/core/testing';
import { HeroDetailComponent } from '../src/app/hero-detail/hero-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroService } from '../src/app/hero.service';
import { Location } from '@angular/common';

describe('HeroDetailComponent', () => {
	let heroService: HeroService;
	let component: HeroDetailComponent;
	let fixture: ComponentFixture<HeroDetailComponent>;
	const locationSpy = cy.spy('Location', ['back']);	 
	const heroServiceSpy = {
		getHero(param:number)  { return { id: 1, name: 'Test'} },
	};
	 
	beforeEach(async(() => {	
	  TestBed.configureTestingModule({
		declarations: [HeroDetailComponent],
		imports: [RouterTestingModule, HttpClientTestingModule, Location],
		providers: [{provide: HeroService, useValue: heroServiceSpy}]
	  }).compileComponents();
	}));
	beforeEach(() => {
		 fixture = TestBed.createComponent(HeroDetailComponent);
		 component = TestBed.inject(HeroDetailComponent);
		 heroService = TestBed.inject(HeroService);	
		 
		const spy = cy.spy(heroService, ['getHero', 'updateHero']).as("heroServiceSpy");
		const locationSpyObj = cy.spy('Location', ['back']);	 
	});
	it('should create', () => {
		const spy = cy.spy(heroService, ['getHero', 'updateHero']).as("heroServiceSpy");
		const locationSpyObj = cy.spy('Location', ['back']);	 
		component.ngOnInit()			
		fixture.detectChanges();
		expect(spy).to.be.called;
	});
	it('should display hero details', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h2').textContent).toContain(testHero.name.toUpperCase());
      expect(compiled.querySelector('div span').textContent).toContain('id:');
      expect(compiled.querySelector('div').textContent).toContain(testHero.id);
      expect(compiled.querySelector('label').textContent).toContain('Hero name:');
      expect(compiled.querySelector('input').value).toContain(testHero.name);
    });

    it('should go back when "go back" button is clicked', () => {		
      const button = fixture.nativeElement.querySelector('button:first-of-type');
      button.click();
      expect(locationSpy.back).toHaveBeenCalled();
    });

  it('should update hero when "save" button is clicked', () => {
    heroServiceSpy.updateHero.and.returnValue(of(testHero));
    const button = fixture.nativeElement.querySelector('button:last-of-type');
    button.click();
    expect(heroServiceSpy.updateHero).toHaveBeenCalledWith(testHero);
    expect(locationSpy.back).toHaveBeenCalled();
  });	
});
