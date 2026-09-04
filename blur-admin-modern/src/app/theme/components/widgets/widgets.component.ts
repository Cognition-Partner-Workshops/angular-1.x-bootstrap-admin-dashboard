import { Component, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BaPanelComponent } from '../ba-panel/ba-panel.component';

export interface Widget { title: string; panelClass?: string; template: TemplateRef<unknown> }
export interface WidgetBlock { widgets: Widget[][] }

@Component({
  selector: 'widgets',
  standalone: true,
  imports: [NgTemplateOutlet, BaPanelComponent],
  template: `
    <div class="widgets">
      @for (block of widgets(); track $index) {
        <div [class.row]="block.widgets.length > 1">
          @for (col of block.widgets; track $index) {
            <div class="widgets-block" [class.col-md-6]="block.widgets.length === 2">
              @for (widget of col; track widget.title) {
                <ba-panel [title]="widget.title" [baPanelClass]="'with-scroll ' + (widget.panelClass ?? '')">
                  <ng-container *ngTemplateOutlet="widget.template" />
                </ba-panel>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class WidgetsComponent {
  readonly widgets = input<WidgetBlock[]>([]);
}
