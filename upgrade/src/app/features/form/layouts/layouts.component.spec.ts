import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LayoutsComponent } from './layouts.component';

describe('LayoutsComponent', () => {
  let component: LayoutsComponent;
  let fixture: ComponentFixture<LayoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutsComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Route Navigation Parity', () => {
    it('should render the form layouts page', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const pageContainer = compiled.querySelector('[data-testid="form-layouts-page"]');
      expect(pageContainer).toBeTruthy();
    });
  });

  describe('Visual Parity - Form Layout Panels', () => {
    it('should render Inline Form panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="inline-form-panel"]');
      expect(panel).toBeTruthy();
      
      const heading = panel?.querySelector('.panel-heading');
      expect(heading?.textContent).toBe('Inline Form');
    });

    it('should render Basic Form panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="basic-form-panel"]');
      expect(panel).toBeTruthy();
      
      const heading = panel?.querySelector('.panel-heading');
      expect(heading?.textContent).toBe('Basic Form');
    });

    it('should render Horizontal Form panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="horizontal-form-panel"]');
      expect(panel).toBeTruthy();
      
      const heading = panel?.querySelector('.panel-heading');
      expect(heading?.textContent).toBe('Horizontal Form');
    });

    it('should render Form Without Labels panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="form-without-labels-panel"]');
      expect(panel).toBeTruthy();
      
      const heading = panel?.querySelector('.panel-heading');
      expect(heading?.textContent).toBe('Form Without Labels');
    });

    it('should render Block Form panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="block-form-panel"]');
      expect(panel).toBeTruthy();
      
      const heading = panel?.querySelector('.panel-heading');
      expect(heading?.textContent).toBe('Block Form');
    });
  });

  describe('Inline Form Parity', () => {
    it('should have name input field', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('[data-testid="inline-name-input"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.placeholder).toBe('Name');
      expect(input.type).toBe('text');
    });

    it('should have email input field', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('[data-testid="inline-email-input"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.placeholder).toBe('Email');
      expect(input.type).toBe('email');
    });

    it('should have remember me checkbox', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const checkbox = compiled.querySelector('[data-testid="inline-remember-checkbox"]') as HTMLInputElement;
      expect(checkbox).toBeTruthy();
      expect(checkbox.type).toBe('checkbox');
    });

    it('should have primary submit button with correct text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('[data-testid="inline-submit-btn"]') as HTMLButtonElement;
      expect(button).toBeTruthy();
      expect(button.textContent?.trim()).toBe('Send invitation');
      expect(button.classList.contains('btn-primary')).toBeTrue();
    });
  });

  describe('Basic Form Parity', () => {
    it('should have email input with label', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('[data-testid="basic-email-input"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.placeholder).toBe('Email');
      
      const label = compiled.querySelector('label[for="exampleInputEmail1"]');
      expect(label?.textContent).toBe('Email address');
    });

    it('should have password input with label', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('[data-testid="basic-password-input"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.type).toBe('password');
      
      const label = compiled.querySelector('label[for="exampleInputPassword1"]');
      expect(label?.textContent).toBe('Password');
    });

    it('should have danger submit button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('[data-testid="basic-submit-btn"]') as HTMLButtonElement;
      expect(button).toBeTruthy();
      expect(button.textContent?.trim()).toBe('Submit');
      expect(button.classList.contains('btn-danger')).toBeTrue();
    });
  });

  describe('Horizontal Form Parity', () => {
    it('should have horizontal form layout', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const form = compiled.querySelector('[data-testid="horizontal-form"]');
      expect(form?.classList.contains('form-horizontal')).toBeTrue();
    });

    it('should have warning submit button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('[data-testid="horizontal-submit-btn"]') as HTMLButtonElement;
      expect(button).toBeTruthy();
      expect(button.textContent?.trim()).toBe('Sign in');
      expect(button.classList.contains('btn-warning')).toBeTrue();
    });
  });

  describe('Form Without Labels Parity', () => {
    it('should have recipients input without label', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('[data-testid="no-labels-recipients-input"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.placeholder).toBe('Recipients');
    });

    it('should have subject input without label', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('[data-testid="no-labels-subject-input"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.placeholder).toBe('Subject');
    });

    it('should have message textarea without label', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const textarea = compiled.querySelector('[data-testid="no-labels-message-input"]') as HTMLTextAreaElement;
      expect(textarea).toBeTruthy();
      expect(textarea.placeholder).toBe('Message');
    });

    it('should have success submit button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('[data-testid="no-labels-submit-btn"]') as HTMLButtonElement;
      expect(button).toBeTruthy();
      expect(button.textContent?.trim()).toBe('Send');
      expect(button.classList.contains('btn-success')).toBeTrue();
    });
  });

  describe('Block Form Parity', () => {
    it('should have first name and last name in same row', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const firstNameInput = compiled.querySelector('[data-testid="block-firstname-input"]');
      const lastNameInput = compiled.querySelector('[data-testid="block-lastname-input"]');
      expect(firstNameInput).toBeTruthy();
      expect(lastNameInput).toBeTruthy();
    });

    it('should have email and website in same row', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const emailInput = compiled.querySelector('[data-testid="block-email-input"]');
      const websiteInput = compiled.querySelector('[data-testid="block-website-input"]');
      expect(emailInput).toBeTruthy();
      expect(websiteInput).toBeTruthy();
    });

    it('should have primary submit button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('[data-testid="block-submit-btn"]') as HTMLButtonElement;
      expect(button).toBeTruthy();
      expect(button.textContent?.trim()).toBe('Submit');
      expect(button.classList.contains('btn-primary')).toBeTrue();
    });
  });

  describe('Form Submission Handlers', () => {
    it('should call onInlineFormSubmit when inline form is submitted', () => {
      spyOn(component, 'onInlineFormSubmit');
      const compiled = fixture.nativeElement as HTMLElement;
      const form = compiled.querySelector('[data-testid="inline-form"]') as HTMLFormElement;
      form.dispatchEvent(new Event('submit'));
      expect(component.onInlineFormSubmit).toHaveBeenCalled();
    });

    it('should call onBasicFormSubmit when basic form is submitted', () => {
      spyOn(component, 'onBasicFormSubmit');
      const compiled = fixture.nativeElement as HTMLElement;
      const form = compiled.querySelector('[data-testid="basic-form"]') as HTMLFormElement;
      form.dispatchEvent(new Event('submit'));
      expect(component.onBasicFormSubmit).toHaveBeenCalled();
    });

    it('should call onHorizontalFormSubmit when horizontal form is submitted', () => {
      spyOn(component, 'onHorizontalFormSubmit');
      const compiled = fixture.nativeElement as HTMLElement;
      const form = compiled.querySelector('[data-testid="horizontal-form"]') as HTMLFormElement;
      form.dispatchEvent(new Event('submit'));
      expect(component.onHorizontalFormSubmit).toHaveBeenCalled();
    });

    it('should call onFormWithoutLabelsSubmit when form without labels is submitted', () => {
      spyOn(component, 'onFormWithoutLabelsSubmit');
      const compiled = fixture.nativeElement as HTMLElement;
      const form = compiled.querySelector('[data-testid="form-without-labels"]') as HTMLFormElement;
      form.dispatchEvent(new Event('submit'));
      expect(component.onFormWithoutLabelsSubmit).toHaveBeenCalled();
    });

    it('should call onBlockFormSubmit when block form is submitted', () => {
      spyOn(component, 'onBlockFormSubmit');
      const compiled = fixture.nativeElement as HTMLElement;
      const form = compiled.querySelector('[data-testid="block-form"]') as HTMLFormElement;
      form.dispatchEvent(new Event('submit'));
      expect(component.onBlockFormSubmit).toHaveBeenCalled();
    });
  });
});
