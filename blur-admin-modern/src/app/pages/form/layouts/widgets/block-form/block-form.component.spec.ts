import { TestBed } from '@angular/core/testing';
import { BlockFormComponent } from './block-form.component';
describe('BlockFormComponent', () => { it('creates', async () => { await TestBed.configureTestingModule({ imports: [BlockFormComponent] }).compileComponents(); expect(TestBed.createComponent(BlockFormComponent)).toBeTruthy(); }); });
