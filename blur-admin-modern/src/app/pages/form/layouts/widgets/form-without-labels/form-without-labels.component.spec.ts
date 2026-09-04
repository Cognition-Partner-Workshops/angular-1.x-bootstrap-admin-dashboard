import { TestBed } from '@angular/core/testing';
import { FormWithoutLabelsComponent } from './form-without-labels.component';
describe('FormWithoutLabelsComponent', () => { it('creates', async () => { await TestBed.configureTestingModule({ imports: [FormWithoutLabelsComponent] }).compileComponents(); expect(TestBed.createComponent(FormWithoutLabelsComponent)).toBeTruthy(); }); });
