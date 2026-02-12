import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputsComponent } from './inputs.component';
import { provideRouter } from '@angular/router';

describe('InputsComponent', () => {
  let component: InputsComponent;
  let fixture: ComponentFixture<InputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputsComponent, FormsModule],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(InputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Route Reachability Parity', () => {
    it('should render the form inputs page', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const pageContainer = compiled.querySelector('.form-inputs-page');
      expect(pageContainer).toBeTruthy();
    });

    it('should render all seven panels', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panels = compiled.querySelectorAll('app-ba-panel');
      expect(panels.length).toBe(7);
    });
  });

  describe('Input Validation Parity', () => {
    it('should have text input field', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('[data-testid="text-input"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.type).toBe('text');
      expect(input.placeholder).toBe('Text');
    });

    it('should have password input field', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('[data-testid="password-input"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.type).toBe('password');
      expect(input.placeholder).toBe('Password');
    });

    it('should have disabled input field', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('[data-testid="disabled-input"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.disabled).toBeTrue();
    });

    it('should accept and display text values correctly', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('[data-testid="text-input"]') as HTMLInputElement;
      
      input.value = 'Test Value';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      expect(input.value).toBe('Test Value');
    });

    it('should have validation states with correct styling', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      
      const successInput = compiled.querySelector('[data-testid="validation-success"]');
      const warningInput = compiled.querySelector('[data-testid="validation-warning"]');
      const errorInput = compiled.querySelector('[data-testid="validation-error"]');
      
      expect(successInput?.classList.contains('has-success')).toBeTrue();
      expect(warningInput?.classList.contains('has-warning')).toBeTrue();
      expect(errorInput?.classList.contains('has-error')).toBeTrue();
    });
  });

  describe('Switch Toggle Parity', () => {
    it('should render all five switches', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const switchesPanel = compiled.querySelector('[data-testid="switches-panel"]');
      expect(switchesPanel).toBeTruthy();
      
      const switches = switchesPanel?.querySelectorAll('.switcher-container');
      expect(switches?.length).toBe(5);
    });

    it('should have primary switch', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const primarySwitch = compiled.querySelector('[data-testid="switch-primary"]');
      expect(primarySwitch).toBeTruthy();
      
      const switcher = primarySwitch?.querySelector('.switcher');
      expect(switcher?.classList.contains('primary')).toBeTrue();
    });

    it('should have success switch', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const successSwitch = compiled.querySelector('[data-testid="switch-success"]');
      expect(successSwitch).toBeTruthy();
      
      const switcher = successSwitch?.querySelector('.switcher');
      expect(switcher?.classList.contains('success')).toBeTrue();
    });

    it('should have warning switch', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const warningSwitch = compiled.querySelector('[data-testid="switch-warning"]');
      expect(warningSwitch).toBeTruthy();
      
      const switcher = warningSwitch?.querySelector('.switcher');
      expect(switcher?.classList.contains('warning')).toBeTrue();
    });

    it('should have danger switch', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const dangerSwitch = compiled.querySelector('[data-testid="switch-danger"]');
      expect(dangerSwitch).toBeTruthy();
      
      const switcher = dangerSwitch?.querySelector('.switcher');
      expect(switcher?.classList.contains('danger')).toBeTrue();
    });

    it('should have info switch', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const infoSwitch = compiled.querySelector('[data-testid="switch-info"]');
      expect(infoSwitch).toBeTruthy();
      
      const switcher = infoSwitch?.querySelector('.switcher');
      expect(switcher?.classList.contains('info')).toBeTrue();
    });

    it('should toggle switch state when clicked', () => {
      const initialState = component.switches.s1;
      
      const compiled = fixture.nativeElement as HTMLElement;
      const primarySwitch = compiled.querySelector('[data-testid="switch-primary"]') as HTMLElement;
      const checkbox = primarySwitch.querySelector('input[type="checkbox"]') as HTMLInputElement;
      
      checkbox.click();
      fixture.detectChanges();
      
      expect(component.switches.s1).toBe(!initialState);
    });

    it('should display ON/OFF labels on switches', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const primarySwitch = compiled.querySelector('[data-testid="switch-primary"]');
      
      const onHandle = primarySwitch?.querySelector('.handle-on');
      const offHandle = primarySwitch?.querySelector('.handle-off');
      
      expect(onHandle?.textContent?.trim()).toBe('ON');
      expect(offHandle?.textContent?.trim()).toBe('OFF');
    });
  });

  describe('Tag Input Parity', () => {
    it('should render primary tags input', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const tagsInput = compiled.querySelector('[data-testid="tags-input-primary"]');
      expect(tagsInput).toBeTruthy();
    });

    it('should render warning tags input', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const tagsInput = compiled.querySelector('[data-testid="tags-input-warning"]');
      expect(tagsInput).toBeTruthy();
    });

    it('should render danger tags input', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const tagsInput = compiled.querySelector('[data-testid="tags-input-danger"]');
      expect(tagsInput).toBeTruthy();
    });

    it('should display initial tags', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const tagsInput = compiled.querySelector('[data-testid="tags-input-primary"]');
      const tags = tagsInput?.querySelectorAll('.tag');
      
      expect(tags?.length).toBeGreaterThan(0);
    });

    it('should add tag when Enter is pressed', () => {
      const initialTagCount = component.tags.primary.length;
      
      component.newTag.primary = 'NewTag';
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.addTag('primary', event);
      fixture.detectChanges();
      
      expect(component.tags.primary.length).toBe(initialTagCount + 1);
      expect(component.tags.primary).toContain('NewTag');
    });

    it('should remove tag when remove button is clicked', () => {
      const initialTagCount = component.tags.primary.length;
      
      component.removeTag('primary', 0);
      fixture.detectChanges();
      
      expect(component.tags.primary.length).toBe(initialTagCount - 1);
    });

    it('should have tag input field for adding new tags', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const input = compiled.querySelector('[data-testid="tag-input-primary"]') as HTMLInputElement;
      expect(input).toBeTruthy();
      expect(input.placeholder).toBe('Add Tag');
    });

    it('should have remove button on each tag', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const removeButton = compiled.querySelector('[data-testid="remove-tag-primary"]');
      expect(removeButton).toBeTruthy();
    });
  });

  describe('Checkboxes & Radios Parity', () => {
    it('should render three checkboxes', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const checkbox1 = compiled.querySelector('[data-testid="checkbox-1"]');
      const checkbox2 = compiled.querySelector('[data-testid="checkbox-2"]');
      const checkbox3 = compiled.querySelector('[data-testid="checkbox-3"]');
      
      expect(checkbox1).toBeTruthy();
      expect(checkbox2).toBeTruthy();
      expect(checkbox3).toBeTruthy();
    });

    it('should render three radio buttons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const radio1 = compiled.querySelector('[data-testid="radio-1"]');
      const radio2 = compiled.querySelector('[data-testid="radio-2"]');
      const radio3 = compiled.querySelector('[data-testid="radio-3"]');
      
      expect(radio1).toBeTruthy();
      expect(radio2).toBeTruthy();
      expect(radio3).toBeTruthy();
    });

    it('should toggle checkbox state when clicked', () => {
      const initialState = component.checkboxes.check1;
      
      const compiled = fixture.nativeElement as HTMLElement;
      const checkbox = compiled.querySelector('[data-testid="checkbox-1"]') as HTMLInputElement;
      checkbox.click();
      fixture.detectChanges();
      
      expect(component.checkboxes.check1).toBe(!initialState);
    });

    it('should update radio value when clicked', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const radio2 = compiled.querySelector('[data-testid="radio-2"]') as HTMLInputElement;
      radio2.click();
      fixture.detectChanges();
      
      expect(component.radioValue).toBe('option2');
    });
  });

  describe('Select Dropdowns Parity', () => {
    it('should render standard select', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const select = compiled.querySelector('[data-testid="select-standard"]');
      expect(select).toBeTruthy();
    });

    it('should render select with search', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const select = compiled.querySelector('[data-testid="select-with-search"]');
      expect(select).toBeTruthy();
    });

    it('should render disabled select', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const select = compiled.querySelector('[data-testid="select-disabled"]');
      expect(select).toBeTruthy();
      
      const button = select?.querySelector('button');
      expect(button?.disabled).toBeTrue();
    });

    it('should render grouped select', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const select = compiled.querySelector('[data-testid="select-grouped"]');
      expect(select).toBeTruthy();
    });

    it('should render multiple select', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const select = compiled.querySelector('[data-testid="select-multiple"]');
      expect(select).toBeTruthy();
    });

    it('should toggle dropdown when clicked', () => {
      expect(component.dropdownOpen['standard']).toBeFalsy();
      
      component.toggleDropdown('standard');
      fixture.detectChanges();
      
      expect(component.dropdownOpen['standard']).toBeTrue();
    });

    it('should select option when clicked', () => {
      const testItem = { value: 99, label: 'Test Item' };
      component.selectOption('standard', testItem);
      fixture.detectChanges();
      
      expect(component.selectedItem).toEqual(testItem);
    });

    it('should filter search items based on search term', () => {
      component.searchTerm = 'Ala';
      const filtered = component.getFilteredSearchItems();
      
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered.every(item => item.label.toLowerCase().includes('ala'))).toBeTrue();
    });
  });

  describe('Input Groups Parity', () => {
    it('should render input groups with addons', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const inputGroups = compiled.querySelectorAll('.input-group');
      expect(inputGroups.length).toBeGreaterThan(0);
    });

    it('should have input group with left addon', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const leftAddon = compiled.querySelector('.input-group-addon.addon-left');
      expect(leftAddon).toBeTruthy();
    });

    it('should have input group with right addon', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const rightAddon = compiled.querySelector('.input-group-addon.addon-right');
      expect(rightAddon).toBeTruthy();
    });

    it('should have input group with button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttonGroup = compiled.querySelector('.input-group-btn');
      expect(buttonGroup).toBeTruthy();
      
      const button = buttonGroup?.querySelector('.btn');
      expect(button?.textContent?.trim()).toBe('Go!');
    });
  });
});
