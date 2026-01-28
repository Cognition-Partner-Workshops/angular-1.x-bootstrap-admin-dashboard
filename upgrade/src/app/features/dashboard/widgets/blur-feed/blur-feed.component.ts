import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FeedMessage {
  type: 'text-message' | 'video-message' | 'image-message' | 'geo-message';
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
  styleUrl: './blur-feed.component.scss'
})
export class BlurFeedComponent implements OnInit {
  feed: FeedMessage[] = [];

  ngOnInit(): void {
    this.feed = [
      {
        type: 'text-message',
        author: 'Kostya',
        surname: 'Danovsky',
        header: 'Posted new message',
        text: 'Guys, check this out: \nA police officer found a perfect hiding place for watching for speeding motorists. One day, the officer was amazed when everyone was under the speed limit, so he investigated and found the problem. A 10 years old boy was standing on the side of the road with a huge hand painted sign which said "Radar Trap Ahead." A little more investigative work led the officer to the boy\'s accomplice: another boy about 100 yards beyond the radar trap with a sign reading "TIPS" and a bucket at his feet full of change.',
        time: 'Today 11:55 pm',
        ago: '25 minutes ago',
        expanded: false
      },
      {
        type: 'video-message',
        author: 'Andrey',
        surname: 'Hrabouski',
        header: 'Added new video',
        text: '"Vader and Me"',
        preview: 'assets/img/feed/vader-preview.jpg',
        link: 'https://www.youtube.com/watch?v=IfcpzBbbamk',
        time: 'Today 9:30 pm',
        ago: '3 hrs ago',
        expanded: false
      },
      {
        type: 'image-message',
        author: 'Vlad',
        surname: 'Lugovsky',
        header: 'Added new image',
        text: '"My little kitten"',
        preview: 'assets/img/feed/kitten.jpg',
        link: '#',
        time: 'Today 2:20 pm',
        ago: '10 hrs ago',
        expanded: false
      },
      {
        type: 'text-message',
        author: 'Nasta',
        surname: 'Linnie',
        header: 'Posted new message',
        text: 'Haha lol',
        time: '11.11.2015',
        ago: '2 days ago',
        expanded: false
      },
      {
        type: 'geo-message',
        author: 'Nick',
        surname: 'Cat',
        header: 'Posted location',
        text: '"New York, USA"',
        preview: 'assets/img/feed/location.jpg',
        link: 'https://www.google.by/maps/place/New+York,+NY,+USA/@40.7201111,-73.9893872,14z',
        time: '11.11.2015',
        ago: '2 days ago',
        expanded: false
      },
      {
        type: 'text-message',
        author: 'Vlad',
        surname: 'Lugovsky',
        header: 'Posted new message',
        text: "First snake: I hope I'm not poisonous. Second snake: Why? First snake: Because I bit my lip!",
        time: '12.11.2015',
        ago: '3 days ago',
        expanded: false
      },
      {
        type: 'text-message',
        author: 'Andrey',
        surname: 'Hrabouski',
        header: 'Posted new message',
        text: 'How do you smuggle an elephant across the border? Put a slice of bread on each side, and call him "lunch".',
        time: '14.11.2015',
        ago: '5 days ago',
        expanded: false
      },
      {
        type: 'text-message',
        author: 'Nasta',
        surname: 'Linnie',
        header: 'Posted new message',
        text: 'When your hammer is C++, everything begins to look like a thumb.',
        time: '14.11.2015',
        ago: '5 days ago',
        expanded: false
      },
      {
        type: 'text-message',
        author: 'Alexander',
        surname: 'Demeshko',
        header: 'Posted new message',
        text: '"I mean, they say you die twice. One time when you stop breathing and a second time, a bit later on, when somebody says your name for the last time." (c)',
        time: '15.11.2015',
        ago: '6 days ago',
        expanded: false
      },
      {
        type: 'image-message',
        author: 'Nick',
        surname: 'Cat',
        header: 'Posted photo',
        text: '"Protein Heroes"',
        preview: 'assets/img/feed/genom.jpg',
        link: 'https://dribbble.com/shots/2504810-Protein-Heroes',
        time: '16.11.2015',
        ago: '7 days ago',
        expanded: false
      },
      {
        type: 'text-message',
        author: 'Kostya',
        surname: 'Danovsky',
        header: 'Posted new message',
        text: 'Why did the CoffeeScript developer keep getting lost? Because he couldn\'t find his source without a map',
        time: '18.11.2015',
        ago: '9 days ago',
        expanded: false
      }
    ];
  }

  expandMessage(message: FeedMessage): void {
    message.expanded = !message.expanded;
  }

  getProfilePicture(author: string): string {
    const initial = author.charAt(0).toUpperCase();
    return initial;
  }

  getMessageTypeIcon(type: string): string {
    switch (type) {
      case 'video-message': return 'play';
      case 'image-message': return 'image';
      case 'geo-message': return 'location';
      default: return '';
    }
  }
}
