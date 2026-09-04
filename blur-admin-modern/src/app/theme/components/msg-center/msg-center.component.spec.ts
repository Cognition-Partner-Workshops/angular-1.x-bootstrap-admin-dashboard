import { TestBed } from '@angular/core/testing';
import { MsgCenterComponent } from './msg-center.component';

describe('MsgCenterComponent', () => {
  beforeEach(async () => TestBed.configureTestingModule({ imports: [MsgCenterComponent] }).compileComponents());
  it('creates and renders both dropdown triggers and demo messages', () => {
    const fixture = TestBed.createComponent(MsgCenterComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('li[ngbdropdown]').length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('.msg-list a').length).toBe(14);
  });
  it('replaces a zero user id and returns trusted HTML', () => {
    const result = TestBed.createComponent(MsgCenterComponent).componentInstance.getMessage(
      { userId: 0, template: '&name posted', time: '' },
    );
    expect(result.toString()).toContain('<strong>Vlad</strong>');
  });
});
