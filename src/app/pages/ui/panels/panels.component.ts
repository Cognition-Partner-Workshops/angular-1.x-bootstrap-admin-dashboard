import { Component } from '@angular/core';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-panels',
  standalone: true,
  imports: [BaPanelComponent],
  template: `
    <div class="row">
      <div class="col-md-6">
        <app-ba-panel title="Panel with heading">
          <p>Panel content goes here. This demonstrates the migrated ba-panel directive from AngularJS.</p>
        </app-ba-panel>
      </div>
      <div class="col-md-6">
        <app-ba-panel title="Another Panel">
          <p>You can use panels to organize content into collapsible sections.</p>
        </app-ba-panel>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <app-ba-panel title="Primary Panel" panelClass="panel-primary">
          <p>Primary panel content.</p>
        </app-ba-panel>
      </div>
      <div class="col-md-4">
        <app-ba-panel title="Success Panel" panelClass="panel-success">
          <p>Success panel content.</p>
        </app-ba-panel>
      </div>
      <div class="col-md-4">
        <app-ba-panel title="Info Panel" panelClass="panel-info">
          <p>Info panel content.</p>
        </app-ba-panel>
      </div>
    </div>
  `,
})
export class PanelsComponent {}
