import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaPanelComponent } from '../../../theme/components/ba-panel/ba-panel.component';

interface TimelineItem {
  time: string;
  title: string;
  content: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, BaPanelComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
})
export class TimelineComponent {
  timelineItems: TimelineItem[] = [
    { time: '10:00', title: 'Meeting', content: 'Discuss project requirements with the team. Review mockups and plan implementation.', icon: 'fa fa-users', color: '#209e91' },
    { time: '11:30', title: 'Design Review', content: 'Review the latest design changes with the UI team and provide feedback.', icon: 'fa fa-paint-brush', color: '#2dacd1' },
    { time: '14:00', title: 'Development Sprint', content: 'Focus on implementing the dashboard component features.', icon: 'fa fa-code', color: '#90b900' },
    { time: '15:30', title: 'Code Review', content: 'Review pull requests and provide feedback to team members.', icon: 'fa fa-search', color: '#dfb81c' },
    { time: '17:00', title: 'Release', content: 'Deploy the latest version to the staging environment for testing.', icon: 'fa fa-rocket', color: '#e85656' },
  ];
}
