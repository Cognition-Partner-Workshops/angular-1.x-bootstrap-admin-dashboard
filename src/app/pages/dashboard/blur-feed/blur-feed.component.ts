import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FeedItem {
  type: string;
  author: string;
  surname: string;
  header: string;
  text: string;
  time: string;
  ago: string;
  expanded: boolean;
  preview?: string;
  link?: string;
}

@Component({
  selector: 'app-blur-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blur-feed.component.html',
  styleUrl: './blur-feed.component.scss',
})
export class BlurFeedComponent {
  feed: FeedItem[] = [
    {
      type: 'text-message',
      author: 'Kostya',
      surname: 'Danovsky',
      header: 'Posted new message',
      text: 'Guys, check this out: A police officer found a perfect hiding place for watching for speeding motorists.',
      time: 'Today 11:55 pm',
      ago: '25 minutes ago',
      expanded: false,
    },
    {
      type: 'video-message',
      author: 'Andrey',
      surname: 'Hrabouski',
      header: 'Added new video',
      text: '"Vader and Me"',
      preview: 'assets/img/app/feed/vader-and-me-preview.png',
      link: 'https://www.youtube.com/watch?v=IfcpzBbbamk',
      time: 'Today 9:30 pm',
      ago: '3 hrs ago',
      expanded: false,
    },
    {
      type: 'image-message',
      author: 'Vlad',
      surname: 'Lugovsky',
      header: 'Added new image',
      text: '"My little kitten"',
      preview: 'assets/img/app/feed/my-little-kitten.png',
      time: 'Today 2:20 pm',
      ago: '10 hrs ago',
      expanded: false,
    },
    {
      type: 'text-message',
      author: 'Nasta',
      surname: 'Linnie',
      header: 'Posted new message',
      text: 'Haha lol',
      time: '11.11.2015',
      ago: '2 days ago',
      expanded: false,
    },
    {
      type: 'geo-message',
      author: 'Nick',
      surname: 'Cat',
      header: 'Posted location',
      text: '"New York, USA"',
      preview: 'assets/img/app/feed/new-york-location.png',
      link: 'https://www.google.by/maps/place/New+York,+NY,+USA/@40.7201111,-73.9893872,14z',
      time: '11.11.2015',
      ago: '2 days ago',
      expanded: false,
    },
    {
      type: 'text-message',
      author: 'Vlad',
      surname: 'Lugovsky',
      header: 'Posted new message',
      text: "First snake: I hope I'm not poisonous. Second snake: Why? First snake: Because I bit my lip!",
      time: '12.11.2015',
      ago: '3 days ago',
      expanded: false,
    },
  ];

  getProfilePicture(author: string): string {
    return `assets/img/app/profile/${author}.png`;
  }

  getFeedIcon(type: string): string {
    switch (type) {
      case 'video-message': return 'fa fa-video-camera';
      case 'image-message': return 'fa fa-image';
      case 'geo-message': return 'fa fa-map-marker';
      default: return 'fa fa-comment-o';
    }
  }

  toggleExpand(item: FeedItem): void {
    item.expanded = !item.expanded;
  }
}
