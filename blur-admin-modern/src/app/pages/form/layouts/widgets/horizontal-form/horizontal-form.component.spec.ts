import { TestBed } from '@angular/core/testing';
import { HorizontalFormComponent } from './horizontal-form.component';
describe('HorizontalFormComponent', () => { it('creates', async () => { await TestBed.configureTestingModule({ imports: [HorizontalFormComponent] }).compileComponents(); expect(TestBed.createComponent(HorizontalFormComponent)).toBeTruthy(); }); });
