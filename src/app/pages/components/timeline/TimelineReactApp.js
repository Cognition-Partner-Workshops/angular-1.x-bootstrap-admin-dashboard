(function() {
  'use strict';

  var h = React.createElement;

  var timelineData = [
    { title: 'Title of section 1', icon: 'Euro-Coin', date: 'Jan 14', color: 'warning',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.' },
    { title: 'Title of section 2', icon: 'Laptop-Signal', date: 'Jan 18', color: 'danger',
      text: 'Donec dapibus at leo eget volutpat. Praesent dolor tellus, ultricies venenatis molestie eu, luctus eget nibh. Curabitur ullamcorper eleifend nisl.' },
    { title: 'Title of section 3', icon: 'Checklist', date: 'Feb 18', color: 'primary',
      text: 'Phasellus auctor tellus eget lacinia condimentum. Cum sociis natoque penatibus et magnis dis parturient montes.' },
    { title: 'Title of section 4', icon: 'Boss-3', date: 'Feb 20', color: 'warning',
      text: 'Morbi fringilla in massa ac posuere. Fusce non sagittis massa, id accumsan odio. Nullam eget tempor est. Etiam eu felis eu purus aliquam tristique id quis nisl. Nam eros nibh, consequat sed pulvinar eu, ultrices ornare ligula. Aenean interdum sed nunc sed hendrerit.' },
    { title: 'Title of section 5', icon: 'Online-Shopping', date: 'Feb 21', color: 'danger',
      text: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur eget mattis metus. Nullam egestas eros metus, quis fringilla urna accumsan sed. Aliquam ultrices at arcu vitae tincidunt.' },
    { title: 'Title of section 6', icon: 'Money-Increase', date: 'Feb 23', color: 'primary',
      text: 'Praesent bibendum ante mattis augue consectetur, ut commodo turpis consequat. Donec ligula eros, porta in iaculis vel, semper ac sem. Integer at mauris lorem.' },
    { title: 'Title of section 7', icon: 'Vector', date: 'Feb 24', color: 'warning',
      text: 'Vivamus ut laoreet erat, vitae eleifend eros. Sed varius id tellus non lobortis. Sed dolor ante, cursus non scelerisque sed, euismod id eros.' }
  ];

  function TimelineBlock(props) {
    var item = props.item;
    var imgSrc = 'assets/img/theme/icon/kameleon/' + item.icon + '.svg';

    return h('div', { className: 'cd-timeline-block' },
      h('div', { className: 'cd-timeline-img' },
        h('div', { className: 'kameleon-icon with-round-bg ' + item.color },
          h('img', { src: imgSrc })
        )
      ),
      h('div', { className: 'cd-timeline-content ' + item.color },
        h('h5', null, item.title),
        h('p', null, item.text),
        h('span', { className: 'cd-date' }, item.date)
      )
    );
  }

  function TimelineApp() {
    var ref = React.useRef(null);

    React.useEffect(function() {
      var offset = 0.8;

      function hideBlocks() {
        if (!ref.current) return;
        var blocks = ref.current.querySelectorAll('.cd-timeline-block');
        blocks.forEach(function(block) {
          if (block.getBoundingClientRect().top > window.innerHeight * offset) {
            block.querySelector('.cd-timeline-img').classList.add('is-hidden');
            block.querySelector('.cd-timeline-content').classList.add('is-hidden');
          }
        });
      }

      function showBlocks() {
        if (!ref.current) return;
        var blocks = ref.current.querySelectorAll('.cd-timeline-block');
        blocks.forEach(function(block) {
          var img = block.querySelector('.cd-timeline-img');
          if (block.getBoundingClientRect().top <= window.innerHeight * offset && img.classList.contains('is-hidden')) {
            img.classList.remove('is-hidden');
            img.classList.add('bounce-in');
            var content = block.querySelector('.cd-timeline-content');
            content.classList.remove('is-hidden');
            content.classList.add('bounce-in');
          }
        });
      }

      hideBlocks();

      function onScroll() {
        if (!window.requestAnimationFrame) {
          setTimeout(function() { showBlocks(); }, 100);
        } else {
          window.requestAnimationFrame(function() { showBlocks(); });
        }
      }

      window.addEventListener('scroll', onScroll, true);

      // Use IntersectionObserver as backup for when scroll events don't fire
      var observer = null;
      if (window.IntersectionObserver) {
        observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              var block = entry.target;
              var img = block.querySelector('.cd-timeline-img');
              var content = block.querySelector('.cd-timeline-content');
              if (img && img.classList.contains('is-hidden')) {
                img.classList.remove('is-hidden');
                img.classList.add('bounce-in');
              }
              if (content && content.classList.contains('is-hidden')) {
                content.classList.remove('is-hidden');
                content.classList.add('bounce-in');
              }
            }
          });
        }, { threshold: 0.1 });

        if (ref.current) {
          var blocks = ref.current.querySelectorAll('.cd-timeline-block');
          blocks.forEach(function(block) { observer.observe(block); });
        }
      }

      return function() {
        window.removeEventListener('scroll', onScroll, true);
        if (observer) { observer.disconnect(); }
      };
    }, []);

    return h('div', { 'ba-panel': '' },
      h('section', { id: 'cd-timeline', className: 'cd-container cssanimations', ref: ref },
        timelineData.map(function(item, i) {
          return h(TimelineBlock, { key: i, item: item });
        })
      )
    );
  }

  // Mount/unmount API
  var mountEl = null;
  window.mountTimelineReact = function(element) {
    mountEl = element;
    ReactDOM.render(h(TimelineApp), element);
  };
  window.unmountTimelineReact = function() {
    if (mountEl) {
      ReactDOM.unmountComponentAtNode(mountEl);
      mountEl = null;
    }
  };
})();
