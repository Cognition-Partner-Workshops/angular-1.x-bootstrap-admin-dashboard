import { Component } from '@angular/core';
import { BaPanelComponent } from '../../../theme';
import { StandardFieldsComponent } from './widgets/standard-fields/standard-fields.component';
import { TagsInputPanelComponent } from './widgets/tags-input/tags-input-panel.component';
import { InputGroupsComponent } from './widgets/input-groups/input-groups.component';
import { CheckboxesRadiosComponent } from './widgets/checkboxes-radios/checkboxes-radios.component';
import { SwitchesComponent } from './widgets/switches/switches.component';
import { OldSwitchesComponent } from './widgets/old-switches/old-switches.component';
import { DatepickersComponent } from './widgets/datepickers/datepickers.component';
import { ValidationStatesComponent } from './widgets/validation-states/validation-states.component';
import { SelectsComponent } from './widgets/selects/selects.component';
import { OldSelectsComponent } from './widgets/old-selects/old-selects.component';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [
    BaPanelComponent, StandardFieldsComponent, TagsInputPanelComponent, InputGroupsComponent,
    CheckboxesRadiosComponent, SwitchesComponent, OldSwitchesComponent, DatepickersComponent,
    ValidationStatesComponent, SelectsComponent, OldSelectsComponent,
  ],
  templateUrl: './inputs.component.html',
})
export class InputsComponent {}
