import React from 'react';
import { Panel } from '../components/Panel';

var IMAGES_ROOT = 'assets/img/';

function appImage(input) {
  return IMAGES_ROOT + input;
}

function kameleonImg(input) {
  return IMAGES_ROOT + 'theme/icon/kameleon/' + input + '.svg';
}

export function TypographyPage() {
  return React.createElement('div', { className: 'typography-document-samples row-fluid' },
    React.createElement('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget' },
      React.createElement('div', { 'ba-panel-class': 'with-scroll heading-widget', 'ba-panel-title': 'Text Size' },
        React.createElement(Panel, { title: 'Text Size', panelClass: 'with-scroll heading-widget' },
          React.createElement('div', { className: 'section-block' },
            React.createElement('h1', null, 'H1. Heading 1'),
            React.createElement('p', null, 'Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat vestibulum eleifend pellentesque.')
          ),
          React.createElement('div', { className: 'section-block' },
            React.createElement('h2', null, 'H2. Heading 2'),
            React.createElement('p', null, 'Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat vestibulum eleifend pellentesque.')
          ),
          React.createElement('div', { className: 'section-block' },
            React.createElement('h3', null, 'H3. Heading 3'),
            React.createElement('p', null, 'Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat vestibulum eleifend pellentesque.')
          ),
          React.createElement('div', { className: 'section-block' },
            React.createElement('h4', null, 'H4. Heading 4'),
            React.createElement('p', null, 'Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra,.')
          ),
          React.createElement('div', { className: 'section-block' },
            React.createElement('h5', null, 'H5. Heading 5'),
            React.createElement('p', null, 'Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra.')
          )
        )
      )
    ),

    React.createElement('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget' },
      React.createElement('div', { 'ba-panel-class': 'with-scroll more-text-widget', 'ba-panel-title': 'Some more text' },
        React.createElement(Panel, { title: 'Some more text', panelClass: 'with-scroll more-text-widget' },
          React.createElement('div', { className: 'section-block light-text' },
            React.createElement('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis.')
          ),
          React.createElement('div', { className: 'section-block regular-text' },
            React.createElement('p', null, 'Curabitur bibendum ornare dolor, quis ullamcorper ligula dfgz`zzsodales at. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id.')
          ),
          React.createElement('div', { className: 'section-block upper-text bold-text' },
            React.createElement('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla. ')
          ),
          React.createElement('div', { className: 'section-block bold-text' },
            React.createElement('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullam-corper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla.')
          ),
          React.createElement('div', { className: 'section-block small-text' },
            React.createElement('p', null, 'Secondary text. Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar,'),
            React.createElement('p', null, 'lacinia scelerisque pharetra, placerat vestibulum eleifend'),
            React.createElement('p', null, ' pellentesque, mi nam.')
          )
        )
      )
    ),

    React.createElement('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget' },
      React.createElement('div', { 'ba-panel-class': 'with-scroll lists-widget', 'ba-panel-title': 'Lists' },
        React.createElement(Panel, { title: 'Lists', panelClass: 'with-scroll lists-widget' },
          React.createElement('div', { className: 'section-block' },
            React.createElement('h5', { className: 'list-header' }, 'Unordered list:'),
            React.createElement('ul', { className: 'blur' },
              React.createElement('li', null, 'Lorem ipsum dolor sit amet'),
              React.createElement('li', null, 'Сlacinia scelerisque pharetra',
                React.createElement('ul', null,
                  React.createElement('li', null, 'Dui rhoncus quisque integer lorem',
                    React.createElement('ul', null,
                      React.createElement('li', null, 'Libero iaculis vestibulum eu vitae')
                    )
                  )
                )
              ),
              React.createElement('li', null, 'Nisl lectus nibh habitasse suspendisse ut'),
              React.createElement('li', null, React.createElement('span', null, 'Posuere cursus hac, vestibulum wisi nulla bibendum'))
            ),
            React.createElement('h5', { className: 'list-header' }, 'Ordered Lists:'),
            React.createElement('ol', { className: 'blur' },
              React.createElement('li', null, React.createElement('span', null, 'Eu non nec cursus quis mollis, amet quam nec')),
              React.createElement('li', null,
                React.createElement('span', null, 'Et suspendisse, adipiscing fringilla ornare sit ligula sed'),
                React.createElement('ol', null,
                  React.createElement('li', null,
                    React.createElement('span', null, 'Interdum et justo nulla'),
                    React.createElement('ol', null,
                      React.createElement('li', null, React.createElement('span', null, 'Magna amet, suscipit suscipit non amet'))
                    )
                  )
                )
              ),
              React.createElement('li', null, React.createElement('span', null, 'Metus duis eu non eu ridiculus turpis')),
              React.createElement('li', null, React.createElement('span', null, 'Neque egestas id fringilla consectetuer justo curabitur, wisi magna neque commodo volutpat'))
            ),
            React.createElement('div', { className: 'accent' }, 'Important text fragment. Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra.')
          )
        )
      )
    ),

    React.createElement('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget' },
      React.createElement('div', { 'ba-panel-class': 'with-scroll color-widget', 'ba-panel-title': 'Text Color' },
        React.createElement(Panel, { title: 'Text Color', panelClass: 'with-scroll color-widget' },
          React.createElement('div', { className: 'section-block red-text' },
            React.createElement('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')
          ),
          React.createElement('div', { className: 'section-block yellow-text' },
            React.createElement('p', null, 'Curabitur bibendum ornare dolor, quis ullamcorper ligula dfgz`zzsodales at. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. In sed ornare nulla.')
          ),
          React.createElement('div', { className: 'section-block links' },
            React.createElement('p', null, 'Lorem ipsum ', React.createElement('a', { href: '' }, 'dolor'), ' sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ', React.createElement('a', { href: '' }, 'ullamcorper'), ' ligula sodales at. Nulla tellus elit, varius non commodo eget, ', React.createElement('a', { href: '' }, 'mattis'), ' vel eros. In sed ornare nulla.')
          ),
          React.createElement('div', { className: 'section-block links' },
            React.createElement('p', null, React.createElement('a', { href: '' }, 'Active link \u2014 #209e91')),
            React.createElement('p', { className: 'hovered' }, React.createElement('a', { href: '' }, 'Hover link \u2014 #17857a'))
          )
        )
      )
    ),

    React.createElement('div', { className: 'row-fluid' },
      React.createElement('div', { className: 'col-lg-12 col-sm-12 col-xs-12' },
        React.createElement(Panel, { panelClass: 'banner-column-panel' },
          React.createElement('div', { className: 'banner' },
            React.createElement('div', { className: 'large-banner-wrapper' },
              React.createElement('img', { src: appImage('app/typography/banner.png'), alt: '' })
            ),
            React.createElement('div', { className: 'banner-text-wrapper' },
              React.createElement('div', { className: 'banner-text' },
                React.createElement('h1', null, 'Simple Banner Text'),
                React.createElement('p', null, 'Lorem ipsum dolor sit amet'),
                React.createElement('p', null, 'Odio amet viverra rutrum')
              )
            )
          ),
          React.createElement('div', { className: 'section' },
            React.createElement('h2', null, 'Columns'),
            React.createElement('div', { className: 'row' },
              React.createElement('div', { className: 'col-sm-6' },
                React.createElement('div', { className: 'img-wrapper' }, React.createElement('img', { src: appImage('app/typography/typo03.png'), alt: '', title: '' })),
                React.createElement('p', null, 'Vel elit, eros elementum, id lacinia, duis non ut ut tortor blandit. Mauris ', React.createElement('a', { href: '' }, 'dapibus'), ' magna rutrum. Ornare neque suspendisse ', React.createElement('a', { href: '' }, 'phasellus wisi'), ', quam cras pede rutrum suspendisse, ', React.createElement('a', { href: '' }, 'felis amet eu'), '. Congue magna elit quisque quia, nullam justo sagittis, ante erat libero placerat, proin condimentum consectetuer lacus. Velit condimentum velit, sed penatibus arcu nulla.')
              ),
              React.createElement('div', { className: 'col-sm-6' },
                React.createElement('div', { className: 'img-wrapper' }, React.createElement('img', { src: appImage('app/typography/typo01.png'), alt: '', title: '' })),
                React.createElement('p', null, 'Et suspendisse, adipiscing fringilla ornare sit ligula sed, vel nam. Interdum et justo nulla, fermentum lobortis purus ut eu, duis nibh dolor massa tristique elementum, nibh iste potenti risus fusce aliquet fusce, ullamcorper debitis primis arcu tellus vestibulum ac.')
              )
            ),
            React.createElement('div', { className: 'separator' }),
            React.createElement('div', { className: 'row' },
              React.createElement('div', { className: 'col-sm-4' },
                React.createElement('h4', null, 'Column heading example'),
                React.createElement('div', { className: 'img-wrapper' }, React.createElement('img', { src: appImage('app/typography/typo04.png'), alt: '' })),
                React.createElement('p', null, 'Eget augue, lacus erat ante egestas scelerisque aliquam, metus molestie leo in habitasse magna maecenas'),
                React.createElement('a', { href: '', className: 'learn-more' }, 'Lean more')
              ),
              React.createElement('div', { className: 'col-sm-4' },
                React.createElement('h4', null, 'Yet another column heading example'),
                React.createElement('div', { className: 'img-wrapper' }, React.createElement('img', { src: appImage('app/typography/typo05.png'), alt: '' })),
                React.createElement('p', null, 'Augue massa et parturient, suspendisse orci nec scelerisque sit, integer nam mauris pede consequat in velit'),
                React.createElement('a', { href: '', className: 'learn-more' }, 'Lean more')
              ),
              React.createElement('div', { className: 'col-sm-4' },
                React.createElement('h4', null, 'Third column heading example'),
                React.createElement('div', { className: 'img-wrapper' }, React.createElement('img', { src: appImage('app/typography/typo06.png'), alt: '' })),
                React.createElement('p', null, 'Eget turpis, tortor lobortis porttitor, vestibulum nullam vehicula aliquam'),
                React.createElement('a', { href: '', className: 'learn-more' }, 'Lean more')
              )
            ),
            React.createElement('div', { className: 'separator' })
          )
        )
      )
    )
  );
}
