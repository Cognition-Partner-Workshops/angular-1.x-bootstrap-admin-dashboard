import { Component } from '@angular/core';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [BaPanelComponent],
  template: `
    <app-ba-panel title="Bootstrap Grid System">
      <div class="row grid-demo">
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
        <div class="col-md-1"><div class="grid-cell">.col-md-1</div></div>
      </div>
      <div class="row grid-demo">
        <div class="col-md-8"><div class="grid-cell">.col-md-8</div></div>
        <div class="col-md-4"><div class="grid-cell">.col-md-4</div></div>
      </div>
      <div class="row grid-demo">
        <div class="col-md-4"><div class="grid-cell">.col-md-4</div></div>
        <div class="col-md-4"><div class="grid-cell">.col-md-4</div></div>
        <div class="col-md-4"><div class="grid-cell">.col-md-4</div></div>
      </div>
      <div class="row grid-demo">
        <div class="col-md-6"><div class="grid-cell">.col-md-6</div></div>
        <div class="col-md-6"><div class="grid-cell">.col-md-6</div></div>
      </div>
    </app-ba-panel>
  `,
  styles: [`
    .grid-demo { margin-bottom: 15px; }
    .grid-cell {
      background: #209e91;
      color: #fff;
      padding: 10px;
      text-align: center;
      border: 1px solid rgba(255,255,255,0.3);
      font-size: 12px;
    }
  `],
})
export class GridComponent {}
