import { TestBed } from '@angular/core/testing';
import { InlineFormComponent } from './inline-form.component';
describe('InlineFormComponent', () => { it('creates', async () => { await TestBed.configureTestingModule({ imports: [InlineFormComponent] }).compileComponents(); expect(TestBed.createComponent(InlineFormComponent)).toBeTruthy(); }); });
