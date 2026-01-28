import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Main Tabs', () => {
    it('should have 3 main tabs', () => {
      expect(component.mainTabs.length).toBe(3);
    });

    it('should start with first tab active', () => {
      expect(component.mainActiveTab).toBe(0);
    });

    it('should switch main tabs on selectMainTab', () => {
      component.selectMainTab(1);
      expect(component.mainActiveTab).toBe(1);
    });

    it('should close dropdown when selecting main tab', () => {
      component.dropdownOpen = true;
      component.selectMainTab(0);
      expect(component.dropdownOpen).toBeFalse();
    });
  });

  describe('Dropdown Tab', () => {
    it('should toggle dropdown on toggleDropdown', () => {
      const event = new Event('click');
      spyOn(event, 'stopPropagation');

      component.toggleDropdown(event);
      expect(component.dropdownOpen).toBeTrue();
      expect(event.stopPropagation).toHaveBeenCalled();

      component.toggleDropdown(event);
      expect(component.dropdownOpen).toBeFalse();
    });

    it('should select dropdown tab and activate dropdown tab', () => {
      component.selectDropdownTab(2);
      expect(component.dropdownActiveTab).toBe(2);
      expect(component.mainActiveTab).toBe(2);
      expect(component.dropdownOpen).toBeFalse();
    });
  });

  describe('Left Tabs', () => {
    it('should have 3 left tabs', () => {
      expect(component.leftTabs.length).toBe(3);
    });

    it('should start with first left tab active', () => {
      expect(component.leftActiveTab).toBe(0);
    });

    it('should switch left tabs on selectLeftTab', () => {
      component.selectLeftTab(2);
      expect(component.leftActiveTab).toBe(2);
    });
  });

  describe('Right Tabs', () => {
    it('should have 3 right tabs', () => {
      expect(component.rightTabs.length).toBe(3);
    });

    it('should start with first right tab active', () => {
      expect(component.rightActiveTab).toBe(0);
    });

    it('should switch right tabs on selectRightTab', () => {
      component.selectRightTab(1);
      expect(component.rightActiveTab).toBe(1);
    });
  });

  describe('Sample Accordion', () => {
    it('should have 4 sample accordion panels', () => {
      expect(component.sampleAccordionPanels.length).toBe(4);
    });

    it('should have first panel initially expanded', () => {
      expect(component.sampleAccordionPanels[0].isOpen).toBeTrue();
    });

    it('should toggle accordion panel on toggleAccordionPanel', () => {
      const initialState = component.sampleAccordionPanels[1].isOpen;
      component.toggleAccordionPanel(component.sampleAccordionPanels, 1);
      expect(component.sampleAccordionPanels[1].isOpen).toBe(!initialState);
    });
  });

  describe('Contextual Accordion', () => {
    it('should have 5 contextual accordion panels', () => {
      expect(component.contextualAccordionPanels.length).toBe(5);
    });

    it('should return correct icon for each panel', () => {
      expect(component.getContextualIcon('primary')).toBe('ion-heart');
      expect(component.getContextualIcon('success')).toBe('ion-checkmark-round');
      expect(component.getContextualIcon('info')).toBe('ion-information-circled');
      expect(component.getContextualIcon('warning')).toBe('ion-alert');
      expect(component.getContextualIcon('danger')).toBe('ion-nuclear');
    });

    it('should return empty string for unknown panel', () => {
      expect(component.getContextualIcon('unknown')).toBe('');
    });
  });
});
