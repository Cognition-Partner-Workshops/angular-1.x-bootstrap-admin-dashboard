import { Component } from '@angular/core';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-leaflet',
  standalone: true,
  imports: [BaPanelComponent],
  template: `
    <app-ba-panel title="Leaflet Maps">
      <div class="map-placeholder">
        <p class="text-muted">Leaflet map integration placeholder. Previously used angular-leaflet-directive. To add Leaflet maps, install the &#64;asymmetrik/ngx-leaflet package.</p>
        <div class="mock-map">
          <i class="fa fa-map-marker fa-3x"></i>
          <p>Interactive map area</p>
        </div>
      </div>
    </app-ba-panel>
  `,
  styles: [`
    .mock-map {
      height: 400px;
      background: #e8e8e8;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #999;
    }
  `],
})
export class LeafletComponent {}
