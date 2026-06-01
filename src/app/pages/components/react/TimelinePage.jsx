import React, { useState, useEffect, useRef } from 'react';
import Panel from './Panel';

var IMAGES_ROOT = 'assets/img/';

function kameleonImg(name) {
  return IMAGES_ROOT + 'theme/icon/kameleon/' + name + '.svg';
}

var timelineData = [
  { icon: 'Euro-Coin', type: 'warning', title: 'Title of section 1', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.', date: 'Jan 14' },
  { icon: 'Laptop-Signal', type: 'danger', title: 'Title of section 2', text: 'Donec dapibus at leo eget volutpat. Praesent dolor tellus, ultricies venenatis molestie eu, luctus eget nibh. Curabitur ullamcorper eleifend nisl.', date: 'Jan 18' },
  { icon: 'Checklist', type: 'primary', title: 'Title of section 3', text: 'Phasellus auctor tellus eget lacinia condimentum. Cum sociis natoque penatibus et magnis dis parturient montes.', date: 'Feb 18' },
  { icon: 'Boss-3', type: 'warning', title: 'Title of section 4', text: 'Morbi fringilla in massa ac posuere. Fusce non sagittis massa, id accumsan odio. Nullam eget tempor est. Etiam eu felis eu purus aliquam tristique id quis nisl. Nam eros nibh, consequat sed pulvinar eu, ultrices ornare ligula. Aenean interdum sed nunc sed hendrerit.', date: 'Feb 20' },
  { icon: 'Online-Shopping', type: 'danger', title: 'Title of section 5', text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eget mattis metus. Nullam egestas eros metus, quis fringilla urna accumsan sed. Aliquam ultrices at arcu vitae tincidunt.', date: 'Feb 21' },
  { icon: 'Money-Increase', type: 'primary', title: 'Title of section 6', text: 'Praesent bibendum ante mattis augue consectetur, ut commodo turpis consequat. Donec ligula eros, porta in iaculis vel, semper ac sem. Integer at mauris lorem.', date: 'Feb 23' },
  { icon: 'Vector', type: 'warning', title: 'Title of section 7', text: 'Vivamus ut laoreet erat, vitae eleifend eros. Sed varius id tellus non lobortis. Sed dolor ante, cursus non scelerisque sed, euismod id eros.', date: 'Feb 24' }
];

function TimelineBlock({ item, offset }) {
  var ref = useRef(null);
  var [hidden, setHidden] = useState(true);

  useEffect(function () {
    function checkVisibility() {
      if (ref.current) {
        var top = ref.current.getBoundingClientRect().top + window.scrollY;
        if (top <= window.scrollY + window.innerHeight * offset) {
          setHidden(false);
        }
      }
    }
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    return function () { window.removeEventListener('scroll', checkVisibility); };
  }, [offset]);

  var imgClass = 'cd-timeline-img' + (hidden ? ' is-hidden' : ' bounce-in');
  var contentClass = 'cd-timeline-content ' + item.type + (hidden ? ' is-hidden' : ' bounce-in');

  return (
    <div className="cd-timeline-block" ref={ref}>
      <div className={imgClass}>
        <div className={'kameleon-icon with-round-bg ' + item.type}>
          <img src={kameleonImg(item.icon)} />
        </div>
      </div>
      <div className={contentClass}>
        <h5>{item.title}</h5>
        <p>{item.text}</p>
        <span className="cd-date">{item.date}</span>
      </div>
    </div>
  );
}

function TimelinePage() {
  return (
    <Panel>
      <section id="cd-timeline" className="cd-container cssanimations">
        {timelineData.map(function (item, index) {
          return <TimelineBlock key={index} item={item} offset={0.8} />;
        })}
      </section>
    </Panel>
  );
}

export default TimelinePage;
