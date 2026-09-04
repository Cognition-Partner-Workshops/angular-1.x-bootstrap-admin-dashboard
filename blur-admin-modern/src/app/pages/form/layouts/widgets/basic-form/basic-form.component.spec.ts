import { TestBed } from '@angular/core/testing';
import { BasicFormComponent } from './basic-form.component';
describe('BasicFormComponent', () => { it('creates', async () => { await TestBed.configureTestingModule({ imports: [BasicFormComponent] }).compileComponents(); expect(TestBed.createComponent(BasicFormComponent)).toBeTruthy(); }); });
