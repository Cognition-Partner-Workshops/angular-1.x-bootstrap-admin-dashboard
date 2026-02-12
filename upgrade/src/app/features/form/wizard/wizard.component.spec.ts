import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WizardComponent } from './wizard.component';
import { provideRouter } from '@angular/router';

describe('WizardComponent', () => {
  let component: WizardComponent;
  let fixture: ComponentFixture<WizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardComponent, FormsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(WizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Route Reachability Parity', () => {
    it('should render the form wizard page', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const pageContainer = compiled.querySelector('[data-testid="form-wizard-page"]');
      expect(pageContainer).toBeTruthy();
    });

    it('should render the wizard panel with correct title', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('[data-testid="wizard-panel"]');
      expect(panel).toBeTruthy();
      
      const heading = panel?.querySelector('.panel-heading');
      expect(heading?.textContent).toBe('FORM WIZARD');
    });

    it('should render the wizard container', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const wizardContainer = compiled.querySelector('[data-testid="wizard-container"]');
      expect(wizardContainer).toBeTruthy();
    });
  });

  describe('Step Navigation Parity', () => {
    it('should render all four step navigation tabs', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const navSteps = compiled.querySelectorAll('.ba-wizard-navigation');
      expect(navSteps.length).toBe(4);
      
      expect(navSteps[0].textContent?.trim()).toBe('Personal info');
      expect(navSteps[1].textContent?.trim()).toBe('Product Info');
      expect(navSteps[2].textContent?.trim()).toBe('Shipment');
      expect(navSteps[3].textContent?.trim()).toBe('Finish');
    });

    it('should have first step active by default', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const activeNav = compiled.querySelector('.ba-wizard-navigation.active');
      expect(activeNav?.textContent?.trim()).toBe('Personal info');
    });

    it('should show progress bar at 25% initially', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const progressBar = compiled.querySelector('[data-testid="wizard-progress-bar"]') as HTMLElement;
      expect(progressBar).toBeTruthy();
      expect(progressBar.style.width).toBe('25%');
    });

    it('should have previous button disabled on first step', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const prevBtn = compiled.querySelector('[data-testid="wizard-previous-btn"]') as HTMLButtonElement;
      expect(prevBtn.disabled).toBeTrue();
    });

    it('should have next button enabled on first step', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const nextBtn = compiled.querySelector('[data-testid="wizard-next-btn"]') as HTMLButtonElement;
      expect(nextBtn.disabled).toBeFalse();
    });

    it('should navigate to next step when form is valid and next is clicked', fakeAsync(() => {
      component.personalInfo = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      fixture.detectChanges();
      tick();

      component.nextStep();
      fixture.detectChanges();
      tick();

      expect(component.currentStep).toBe(1);
      
      const compiled = fixture.nativeElement as HTMLElement;
      const productInfoStep = compiled.querySelector('[data-testid="wizard-step-product-info"]');
      expect(productInfoStep).toBeTruthy();
    }));

    it('should not navigate to next step when form is invalid', fakeAsync(() => {
      component.personalInfo = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
      fixture.detectChanges();
      tick();

      component.nextStep();
      fixture.detectChanges();
      tick();

      expect(component.currentStep).toBe(0);
    }));

    it('should navigate back to previous step', fakeAsync(() => {
      component.personalInfo = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      component.nextStep();
      fixture.detectChanges();
      tick();

      expect(component.currentStep).toBe(1);

      component.previousStep();
      fixture.detectChanges();
      tick();

      expect(component.currentStep).toBe(0);
    }));

    it('should update progress bar when navigating steps', fakeAsync(() => {
      component.personalInfo = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      component.nextStep();
      fixture.detectChanges();
      tick();

      const compiled = fixture.nativeElement as HTMLElement;
      const progressBar = compiled.querySelector('[data-testid="wizard-progress-bar"]') as HTMLElement;
      expect(progressBar.style.width).toBe('50%');
    }));
  });

  describe('Form Validation Parity', () => {
    describe('Personal Info Step', () => {
      it('should render personal info form on first step', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const personalInfoStep = compiled.querySelector('[data-testid="wizard-step-personal-info"]');
        expect(personalInfoStep).toBeTruthy();
      });

      it('should have username input field', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const input = compiled.querySelector('[data-testid="wizard-username-input"]') as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.placeholder).toBe('Username');
        expect(input.required).toBeTrue();
      });

      it('should have email input field', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const input = compiled.querySelector('[data-testid="wizard-email-input"]') as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.placeholder).toBe('Email');
        expect(input.type).toBe('email');
        expect(input.required).toBeTrue();
      });

      it('should have password input field', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const input = compiled.querySelector('[data-testid="wizard-password-input"]') as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.placeholder).toBe('Password');
        expect(input.type).toBe('password');
        expect(input.required).toBeTrue();
      });

      it('should have confirm password input field', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const input = compiled.querySelector('[data-testid="wizard-confirm-password-input"]') as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.placeholder).toBe('Confirm Password');
        expect(input.type).toBe('password');
        expect(input.required).toBeTrue();
      });

      it('should validate passwords match', () => {
        component.personalInfo.password = 'password123';
        component.personalInfo.confirmPassword = 'password123';
        expect(component.arePersonalInfoPasswordsEqual()).toBeTrue();

        component.personalInfo.confirmPassword = 'different';
        expect(component.arePersonalInfoPasswordsEqual()).toBeFalse();
      });

      it('should validate email format', () => {
        expect(component.isValidEmail('test@example.com')).toBeTrue();
        expect(component.isValidEmail('invalid-email')).toBeFalse();
        expect(component.isValidEmail('')).toBeFalse();
      });
    });

    describe('Product Info Step', () => {
      beforeEach(fakeAsync(() => {
        component.personalInfo = {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        };
        component.nextStep();
        fixture.detectChanges();
        tick();
      }));

      it('should render product info form on second step', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const productInfoStep = compiled.querySelector('[data-testid="wizard-step-product-info"]');
        expect(productInfoStep).toBeTruthy();
      });

      it('should have product name input field', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const input = compiled.querySelector('[data-testid="wizard-product-name-input"]') as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.placeholder).toBe('Product name');
        expect(input.required).toBeTrue();
      });

      it('should have product id input field', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const input = compiled.querySelector('[data-testid="wizard-product-id-input"]') as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.placeholder).toBe('productId');
        expect(input.required).toBeTrue();
      });

      it('should have category dropdown with correct options', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const select = compiled.querySelector('[data-testid="wizard-category-select"]') as HTMLSelectElement;
        expect(select).toBeTruthy();
        
        const options = select.querySelectorAll('option');
        expect(options.length).toBe(3);
        expect(options[0].textContent?.trim()).toBe('Electronics');
        expect(options[1].textContent?.trim()).toBe('Toys');
        expect(options[2].textContent?.trim()).toBe('Accessories');
      });
    });

    describe('Shipment Step', () => {
      beforeEach(fakeAsync(() => {
        component.personalInfo = {
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
          confirmPassword: 'password123'
        };
        component.productInfo = {
          productName: 'Test Product',
          productId: 'PROD-001',
          category: 'Electronics'
        };
        component.currentStep = 0;
        component.nextStep();
        fixture.detectChanges();
        tick();
        component.nextStep();
        fixture.detectChanges();
        tick();
      }));

      it('should render shipment form on third step', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const shipmentStep = compiled.querySelector('[data-testid="wizard-step-shipment"]');
        expect(shipmentStep).toBeTruthy();
      });

      it('should have address input field', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const input = compiled.querySelector('[data-testid="wizard-address-input"]') as HTMLInputElement;
        expect(input).toBeTruthy();
        expect(input.placeholder).toBe('Shipment address');
        expect(input.required).toBeTrue();
      });

      it('should have shipment method dropdown with correct options', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const select = compiled.querySelector('[data-testid="wizard-shipment-method-select"]') as HTMLSelectElement;
        expect(select).toBeTruthy();
        
        const options = select.querySelectorAll('option');
        expect(options.length).toBe(2);
        expect(options[0].textContent?.trim()).toBe('Fast & expensive');
        expect(options[1].textContent?.trim()).toBe('Cheap & free');
      });

      it('should have save shipment info checkbox', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const checkbox = compiled.querySelector('[data-testid="wizard-save-shipment-checkbox"]') as HTMLInputElement;
        expect(checkbox).toBeTruthy();
        expect(checkbox.type).toBe('checkbox');
      });
    });
  });

  describe('Wizard Completion Parity', () => {
    beforeEach(fakeAsync(() => {
      component.personalInfo = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      component.productInfo = {
        productName: 'Test Product',
        productId: 'PROD-001',
        category: 'Electronics'
      };
      component.shipment = {
        address: '123 Test Street',
        shipmentMethod: 'Fast & expensive',
        saveShipmentInfo: false
      };
      component.currentStep = 0;
      component.nextStep();
      fixture.detectChanges();
      tick();
      component.nextStep();
      fixture.detectChanges();
      tick();
      component.nextStep();
      fixture.detectChanges();
      tick();
    }));

    it('should render finish step on fourth step', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const finishStep = compiled.querySelector('[data-testid="wizard-step-finish"]');
      expect(finishStep).toBeTruthy();
    });

    it('should display completion message', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const message = compiled.querySelector('[data-testid="wizard-completion-message"]');
      expect(message?.textContent?.trim()).toBe('Congratulations! You have successfully filled the form!');
    });

    it('should have next button disabled on last step', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const nextBtn = compiled.querySelector('[data-testid="wizard-next-btn"]') as HTMLButtonElement;
      expect(nextBtn.disabled).toBeTrue();
    });

    it('should have previous button enabled on last step', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const prevBtn = compiled.querySelector('[data-testid="wizard-previous-btn"]') as HTMLButtonElement;
      expect(prevBtn.disabled).toBeFalse();
    });

    it('should show progress bar at 100% on last step', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const progressBar = compiled.querySelector('[data-testid="wizard-progress-bar"]') as HTMLElement;
      expect(progressBar.style.width).toBe('100%');
    });
  });

  describe('Step Availability Logic Parity', () => {
    it('should allow access to first step always', () => {
      expect(component.isStepAvailable(0)).toBeTrue();
    });

    it('should not allow access to second step without valid personal info', () => {
      component.personalInfo = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
      expect(component.isStepAvailable(1)).toBeFalse();
    });

    it('should allow access to second step with valid personal info', () => {
      component.personalInfo = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      expect(component.isStepAvailable(1)).toBeTrue();
    });

    it('should not allow access to third step without valid product info', () => {
      component.personalInfo = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      component.productInfo = {
        productName: '',
        productId: '',
        category: 'Electronics'
      };
      expect(component.isStepAvailable(2)).toBeFalse();
    });

    it('should allow access to third step with valid product info', () => {
      component.personalInfo = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      component.productInfo = {
        productName: 'Test Product',
        productId: 'PROD-001',
        category: 'Electronics'
      };
      expect(component.isStepAvailable(2)).toBeTrue();
    });

    it('should not allow access to fourth step without valid shipment', () => {
      component.personalInfo = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      component.productInfo = {
        productName: 'Test Product',
        productId: 'PROD-001',
        category: 'Electronics'
      };
      component.shipment = {
        address: '',
        shipmentMethod: 'Fast & expensive',
        saveShipmentInfo: false
      };
      expect(component.isStepAvailable(3)).toBeFalse();
    });

    it('should allow access to fourth step with valid shipment', () => {
      component.personalInfo = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };
      component.productInfo = {
        productName: 'Test Product',
        productId: 'PROD-001',
        category: 'Electronics'
      };
      component.shipment = {
        address: '123 Test Street',
        shipmentMethod: 'Fast & expensive',
        saveShipmentInfo: false
      };
      expect(component.isStepAvailable(3)).toBeTrue();
    });
  });

  describe('Navigation Button Parity', () => {
    it('should have previous and next buttons with correct text', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const prevBtn = compiled.querySelector('[data-testid="wizard-previous-btn"]');
      const nextBtn = compiled.querySelector('[data-testid="wizard-next-btn"]');
      
      expect(prevBtn?.textContent).toContain('previous');
      expect(nextBtn?.textContent).toContain('next');
    });

    it('should have buttons with btn-primary class', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const prevBtn = compiled.querySelector('[data-testid="wizard-previous-btn"]');
      const nextBtn = compiled.querySelector('[data-testid="wizard-next-btn"]');
      
      expect(prevBtn?.classList.contains('btn-primary')).toBeTrue();
      expect(nextBtn?.classList.contains('btn-primary')).toBeTrue();
    });
  });
});
