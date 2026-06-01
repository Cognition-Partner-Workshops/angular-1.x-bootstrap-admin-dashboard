/**
 * UI Features React App - Migrated from AngularJS
 * Uses React.createElement (no JSX) for compatibility without build tool changes
 */
(function() {
  'use strict';

  var h = React.createElement;

  // ========== Typography Page ==========
  function TypographyPage() {
    return h('div', { className: 'typography-document-samples row-fluid' },
      h('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget' },
        h('div', { className: 'panel with-scroll heading-widget animated zoomIn' },
          h('div', { className: 'panel-heading clearfix' },
            h('h3', { className: 'panel-title' }, 'Text Size')
          ),
          h('div', { className: 'panel-body' },
            h('div', { className: 'section-block' },
              h('h1', null, 'H1. Heading 1'),
              h('p', null, 'Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat vestibulum eleifend pellentesque.')
            ),
            h('div', { className: 'section-block' },
              h('h2', null, 'H2. Heading 2'),
              h('p', null, 'Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat vestibulum eleifend pellentesque.')
            ),
            h('div', { className: 'section-block' },
              h('h3', null, 'H3. Heading 3'),
              h('p', null, 'Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat vestibulum eleifend pellentesque.')
            ),
            h('div', { className: 'section-block' },
              h('h4', null, 'H4. Heading 4'),
              h('p', null, 'Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra,.')
            ),
            h('div', { className: 'section-block' },
              h('h5', null, 'H5. Heading 5'),
              h('p', null, 'Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra.')
            )
          )
        )
      ),
      h('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget' },
        h('div', { className: 'panel with-scroll more-text-widget animated zoomIn' },
          h('div', { className: 'panel-heading clearfix' },
            h('h3', { className: 'panel-title' }, 'Some more text')
          ),
          h('div', { className: 'panel-body' },
            h('div', { className: 'section-block light-text' },
              h('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis.')
            ),
            h('div', { className: 'section-block regular-text' },
              h('p', null, 'Curabitur bibendum ornare dolor, quis ullamcorper ligula dfgz`zzsodales at. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id.')
            ),
            h('div', { className: 'section-block upper-text bold-text' },
              h('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla. ')
            ),
            h('div', { className: 'section-block bold-text' },
              h('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullam-corper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla.')
            ),
            h('div', { className: 'section-block small-text' },
              h('p', null, 'Secondary text. Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar,'),
              h('p', null, 'lacinia scelerisque pharetra, placerat vestibulum eleifend'),
              h('p', null, ' pellentesque, mi nam.')
            )
          )
        )
      ),
      h('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget' },
        h('div', { className: 'panel with-scroll lists-widget animated zoomIn' },
          h('div', { className: 'panel-heading clearfix' },
            h('h3', { className: 'panel-title' }, 'Lists')
          ),
          h('div', { className: 'panel-body' },
            h('div', { className: 'section-block' },
              h('h5', { className: 'list-header' }, 'Unordered list:'),
              h('ul', { className: 'blur' },
                h('li', null, 'Lorem ipsum dolor sit amet'),
                h('li', null, 'Сlacinia scelerisque pharetra',
                  h('ul', null,
                    h('li', null, 'Dui rhoncus quisque integer lorem',
                      h('ul', null,
                        h('li', null, 'Libero iaculis vestibulum eu vitae')
                      )
                    )
                  )
                ),
                h('li', null, 'Nisl lectus nibh habitasse suspendisse ut'),
                h('li', null, h('span', null, 'Posuere cursus hac, vestibulum wisi nulla bibendum'))
              ),
              h('h5', { className: 'list-header' }, 'Ordered Lists:'),
              h('ol', { className: 'blur' },
                h('li', null, h('span', null, 'Eu non nec cursus quis mollis, amet quam nec')),
                h('li', null, h('span', null, 'Et suspendisse, adipiscing fringilla ornare sit ligula sed'),
                  h('ol', null,
                    h('li', null, h('span', null, 'Interdum et justo nulla'),
                      h('ol', null,
                        h('li', null, h('span', null, 'Magna amet, suscipit suscipit non amet'))
                      )
                    )
                  )
                ),
                h('li', null, h('span', null, 'Metus duis eu non eu ridiculus turpis')),
                h('li', null, h('span', null, 'Neque egestas id fringilla consectetuer justo curabitur, wisi magna neque commodo volutpat'))
              ),
              h('div', { className: 'accent' }, 'Important text fragment. Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra.')
            )
          )
        )
      ),
      h('div', { className: 'col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget' },
        h('div', { className: 'panel with-scroll color-widget animated zoomIn' },
          h('div', { className: 'panel-heading clearfix' },
            h('h3', { className: 'panel-title' }, 'Text Color')
          ),
          h('div', { className: 'panel-body' },
            h('div', { className: 'section-block red-text' },
              h('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare nulla. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.')
            ),
            h('div', { className: 'section-block yellow-text' },
              h('p', null, 'Curabitur bibendum ornare dolor, quis ullamcorper ligula dfgz`zzsodales at. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. In sed ornare nulla.')
            ),
            h('div', { className: 'section-block links' },
              h('p', null, 'Lorem ipsum ', h('a', { href: '' }, 'dolor'), ' sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis ', h('a', { href: '' }, 'ullamcorper'), ' ligula sodales at. Nulla tellus elit, varius non commodo eget, ', h('a', { href: '' }, 'mattis'), ' vel eros. In sed ornare nulla.')
            ),
            h('div', { className: 'section-block links' },
              h('p', null, h('a', { href: '' }, 'Active link \u2014 #209e91')),
              h('p', { className: 'hovered' }, h('a', { href: '' }, 'Hover link \u2014 #17857a'))
            )
          )
        )
      )
    );
  }

  // ========== Buttons Page ==========
  function ButtonsPage() {
    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-md-3' },
          h('div', { className: 'panel with-scroll button-panel animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Flat Buttons')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-default' }, 'Default')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-primary' }, 'Primary')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-success' }, 'Success')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-info' }, 'Info')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-warning' }, 'Warning')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-danger' }, 'Danger'))
            )
          )
        ),
        h('div', { className: 'col-md-3' },
          h('div', { className: 'panel with-scroll button-panel animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Raised Buttons')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-default btn-raised' }, 'Default')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-primary btn-raised' }, 'Primary')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-success btn-raised' }, 'Success')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-info btn-raised' }, 'Info')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-warning btn-raised' }, 'Warning')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-danger btn-raised' }, 'Danger'))
            )
          )
        ),
        h('div', { className: 'col-md-3' },
          h('div', { className: 'panel with-scroll button-panel df-size-button-panel animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Different sizes')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-default btn-xs' }, 'Default')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-primary btn-sm' }, 'Primary')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-success btn-mm' }, 'Success')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-info btn-md' }, 'Info')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-warning btn-xm' }, 'Warning')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-danger btn-lg' }, 'Danger'))
            )
          )
        ),
        h('div', { className: 'col-md-3' },
          h('div', { className: 'panel with-scroll button-panel animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Disabled')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-default', disabled: true }, 'Default')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-primary', disabled: true }, 'Primary')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-success', disabled: true }, 'Success')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-info', disabled: true }, 'Info')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-warning', disabled: true }, 'Warning')),
              h('div', { className: 'button-wrapper' }, h('button', { type: 'button', className: 'btn btn-danger', disabled: true }, 'Danger'))
            )
          )
        )
      )
    );
  }

  // ========== Icons Page ==========
  function IconsPage() {
    var kameleonIcons = ['Beach','Bus','Cheese','Desert','Images','Magician','Makeup','Programming','Shop','Surfer','Phone-Booth','Ninja','Apartment','Batman','Medal-2','Money-Increase','Street-View','Student-3','Bell','Boss-5','Euro-Coin','Chessboard','Burglar','Dna','Clipboard-Plan','Boss-3','Key','Surgeon','Hacker','Santa'];
    var kameleonRoundedIcons = [
      {color:'success',img:'Apartment'},{color:'warning',img:'Bus'},{color:'primary',img:'Checklist'},
      {color:'warning',img:'Desert'},{color:'danger',img:'Laptop-Signal'},{color:'info',img:'Love-Letter'},
      {color:'success',img:'Makeup'},{color:'primary',img:'Santa'},{color:'success',img:'Surfer'},
      {color:'info',img:'Vector'},{color:'warning',img:'Money-Increase'},{color:'info',img:'Alien'},
      {color:'danger',img:'Online-Shopping'},{color:'warning',img:'Euro-Coin'},{color:'info',img:'Boss-3'}
    ];

    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Kameleon SVG Icons')),
            h('div', { className: 'panel-body' },
              kameleonIcons.map(function(icon, i) {
                return h('div', { className: 'kameleon-icon', key: i },
                  h('img', { src: 'assets/img/kameleon/' + icon + '.svg' })
                );
              })
            )
          )
        ),
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Icons With Rounded Background')),
            h('div', { className: 'panel-body' },
              kameleonRoundedIcons.map(function(icon, i) {
                return h('div', { className: 'kameleon-icon with-round-bg ' + icon.color, key: i },
                  h('img', { src: 'assets/img/kameleon/' + icon.img + '.svg' })
                );
              })
            )
          )
        )
      )
    );
  }

  // ========== Modals Page ==========
  function ModalsPage() {
    var useState = React.useState;

    var _modalState = useState(null);
    var openModal = _modalState[0];
    var setOpenModal = _modalState[1];

    function openModalFn(type, size) {
      setOpenModal({ type: type, size: size });
    }

    function closeModal() {
      setOpenModal(null);
    }

    var modalTemplates = {
      basic: { title: 'Modal title', body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.', btn: 'Save changes' },
      large: { title: 'Large modal', body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.', btn: 'Save changes' },
      small: { title: 'Small modal', body: 'Lorem ipsum dolor sit amet.', btn: 'Save changes' },
      success: { title: 'Well Done!', body: 'You successfully read this important alert message.', cls: 'btn-success' },
      info: { title: 'Heads up!', body: 'This alert needs your attention, but it\'s not super important.', cls: 'btn-info' },
      warning: { title: 'Warning!', body: 'Better check yourself, you\'re not looking too good.', cls: 'btn-warning' },
      danger: { title: 'Oh snap!', body: 'Change a few things up and try submitting again.', cls: 'btn-danger' }
    };

    var modalEl = null;
    if (openModal) {
      var tpl = modalTemplates[openModal.type] || modalTemplates.basic;
      var sizeClass = openModal.size === 'lg' ? ' modal-lg' : openModal.size === 'sm' ? ' modal-sm' : '';
      modalEl = ReactDOM.createPortal(
        h('div', { className: 'modal', style: { display: 'block' }, onClick: closeModal },
          h('div', { className: 'modal-dialog' + sizeClass, onClick: function(e) { e.stopPropagation(); } },
            h('div', { className: 'modal-content' },
              h('div', { className: 'modal-header' },
                h('button', { type: 'button', className: 'close', onClick: closeModal },
                  h('em', { className: 'ion-ios-close-empty sn-link-close' })
                ),
                h('h4', { className: 'modal-title' }, tpl.title)
              ),
              h('div', { className: 'modal-body' }, tpl.body),
              h('div', { className: 'modal-footer' },
                h('button', { type: 'button', className: 'btn btn-primary', onClick: closeModal }, tpl.btn || 'OK')
              )
            )
          )
        ),
        document.body
      );
    }

    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Modals')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'modal-buttons clearfix' },
                h('button', { type: 'button', className: 'btn btn-primary', onClick: function() { openModalFn('basic', 'md'); } }, 'Default modal'),
                h('button', { type: 'button', className: 'btn btn-success', onClick: function() { openModalFn('large', 'lg'); } }, 'Large modal'),
                h('button', { type: 'button', className: 'btn btn-warning', onClick: function() { openModalFn('small', 'sm'); } }, 'Small modal')
              )
            )
          )
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Message Modals')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'modal-buttons same-width clearfix' },
                h('button', { type: 'button', className: 'btn btn-success', onClick: function() { openModalFn('success'); } }, 'Success Message'),
                h('button', { type: 'button', className: 'btn btn-info', onClick: function() { openModalFn('info'); } }, 'Info Message'),
                h('button', { type: 'button', className: 'btn btn-warning', onClick: function() { openModalFn('warning'); } }, 'Warning Message'),
                h('button', { type: 'button', className: 'btn btn-danger', onClick: function() { openModalFn('danger'); } }, 'Danger Message')
              )
            )
          )
        ),
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Notifications')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'modal-buttons same-width clearfix' },
                h('button', { type: 'button', className: 'btn btn-success', onClick: function() { if(window.toastr) toastr.success('Your information has been saved successfully!'); } }, 'Success Notification'),
                h('button', { type: 'button', className: 'btn btn-info', onClick: function() { if(window.toastr) toastr.info("You've got a new email!", 'Information'); } }, 'Info Notification'),
                h('button', { type: 'button', className: 'btn btn-warning', onClick: function() { if(window.toastr) toastr.warning('Your computer is about to explode!', 'Warning'); } }, 'Warning Notification'),
                h('button', { type: 'button', className: 'btn btn-danger', onClick: function() { if(window.toastr) toastr.error("Your information hasn't been saved!", 'Error'); } }, 'Danger Notification')
              )
            )
          )
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Progress dialogs')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'modal-buttons same-width clearfix' },
                h('button', { type: 'button', className: 'btn btn-info', onClick: function() { openModalFn('basic'); } }, 'Progress dialog')
              )
            )
          )
        )
      ),
      modalEl
    );
  }

  // ========== Grid Page ==========
  function GridPage() {
    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Inline Form')),
            h('div', { className: 'panel-body' },
              h('h4', { className: 'grid-h' }, 'Stacked to horizontal'),
              h('div', { className: 'row show-grid' },
                Array.from({length: 12}, function(_, i) {
                  return h('div', { className: 'col-md-1', key: i }, h('div', null, '.col-md-1'));
                })
              ),
              h('div', { className: 'row show-grid' },
                h('div', { className: 'col-md-8' }, h('div', null, '.col-md-8')),
                h('div', { className: 'col-md-4' }, h('div', null, '.col-md-4'))
              ),
              h('div', { className: 'row show-grid' },
                h('div', { className: 'col-md-4' }, h('div', null, '.col-md-4')),
                h('div', { className: 'col-md-4' }, h('div', null, '.col-md-4')),
                h('div', { className: 'col-md-4' }, h('div', null, '.col-md-4'))
              ),
              h('div', { className: 'row show-grid' },
                h('div', { className: 'col-md-6' }, h('div', null, '.col-md-6')),
                h('div', { className: 'col-md-6' }, h('div', null, '.col-md-6'))
              )
            )
          )
        )
      )
    );
  }

  // ========== Alerts Page ==========
  function AlertsPage() {
    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Basic')),
            h('div', { className: 'panel-body' },
              h('div', null,
                h('div', { className: 'alert bg-success' }, h('strong', null, 'Well done!'), ' You successfully read this important alert message.'),
                h('div', { className: 'alert bg-info' }, h('strong', null, 'Heads up!'), " This alert needs your attention, but it's not super important."),
                h('div', { className: 'alert bg-warning' }, h('strong', null, 'Warning!'), " Better check yourself, you're not looking too good."),
                h('div', { className: 'alert bg-danger' }, h('strong', null, 'Oh snap!'), ' Change a few things up and try submitting again.')
              )
            )
          )
        ),
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Dismissible alerts')),
            h('div', { className: 'panel-body' },
              h('div', null,
                h('div', { className: 'alert bg-success closeable', role: 'alert' },
                  h('button', { type: 'button', className: 'close', 'aria-label': 'Close' }, h('span', { 'aria-hidden': 'true' }, '\u00d7')),
                  h('strong', null, 'Well done!'), ' You successfully read this important alert message.'
                ),
                h('div', { className: 'alert bg-info closeable', role: 'alert' },
                  h('button', { type: 'button', className: 'close', 'aria-label': 'Close' }, h('span', { 'aria-hidden': 'true' }, '\u00d7')),
                  h('strong', null, 'Heads up!'), " This alert needs your attention, but it's not super important."
                ),
                h('div', { className: 'alert bg-warning closeable', role: 'alert' },
                  h('button', { type: 'button', className: 'close', 'aria-label': 'Close' }, h('span', { 'aria-hidden': 'true' }, '\u00d7')),
                  h('strong', null, 'Warning!'), " Better check yourself, you're not looking too good."
                ),
                h('div', { className: 'alert bg-danger closeable', role: 'alert' },
                  h('button', { type: 'button', className: 'close', 'aria-label': 'Close' }, h('span', { 'aria-hidden': 'true' }, '\u00d7')),
                  h('strong', null, 'Oh snap!'), ' Change a few things up and try submitting again.'
                )
              )
            )
          )
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Links in alerts')),
            h('div', { className: 'panel-body' },
              h('div', null,
                h('div', { className: 'alert bg-success' }, h('strong', null, 'Well done!'), ' You successfully read ', h('a', { href: '', className: 'alert-link' }, 'this important alert message'), '.'),
                h('div', { className: 'alert bg-info' }, h('strong', null, 'Heads up!'), ' This ', h('a', { href: '', className: 'alert-link' }, 'alert needs your attention'), ", but it's not super important."),
                h('div', { className: 'alert bg-warning' }, h('strong', null, 'Warning!'), " Better check yourself, you're ", h('a', { href: '', className: 'alert-link' }, 'not looking too good'), '.'),
                h('div', { className: 'alert bg-danger' }, h('strong', null, 'Oh snap!'), ' ', h('a', { href: '', className: 'alert-link' }, 'Change a few things up'), ' and try submitting again.')
              )
            )
          )
        ),
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Composite alerts')),
            h('div', { className: 'panel-body' },
              h('div', null,
                h('div', { className: 'alert bg-warning' },
                  h('h4', null, 'Warning!'),
                  h('strong', null, 'Pay attention.'), ' Change a few things up and try submitting again.',
                  h('div', { className: 'control-alert' },
                    h('button', { type: 'button', className: 'btn btn-danger' }, 'Pay Attention'),
                    h('button', { type: 'button', className: 'btn btn-primary' }, 'Ignore')
                  )
                )
              )
            )
          )
        )
      )
    );
  }

  // ========== Progress Bars Page ==========
  function ProgressBarsPage() {
    return h('div', { className: 'widgets' },
      h('div', { className: 'row' },
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Basic')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-success', role: 'progressbar', style: { width: '40%' } }, h('span', { className: 'sr-only' }, '40% Complete (success)'))),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-info', role: 'progressbar', style: { width: '20%' } }, h('span', { className: 'sr-only' }, '20% Complete'))),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-warning', role: 'progressbar', style: { width: '60%' } }, h('span', { className: 'sr-only' }, '60% Complete (warning)'))),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-danger', role: 'progressbar', style: { width: '80%' } }, h('span', { className: 'sr-only' }, '80% Complete (danger)')))
            )
          ),
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Striped')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-success progress-bar-striped', role: 'progressbar', style: { width: '40%' } })),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-info progress-bar-striped', role: 'progressbar', style: { width: '20%' } })),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-warning progress-bar-striped', role: 'progressbar', style: { width: '60%' } })),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-danger progress-bar-striped', role: 'progressbar', style: { width: '80%' } }))
            )
          )
        ),
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'With label')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-success', role: 'progressbar', style: { width: '40%' } }, '40%')),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-info', role: 'progressbar', style: { width: '20%' } }, '20%')),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-warning', role: 'progressbar', style: { width: '60%' } }, '60%')),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-danger', role: 'progressbar', style: { width: '80%' } }, '80%'))
            )
          ),
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Animated')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-success progress-bar-striped active', role: 'progressbar', style: { width: '40%' } })),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-info progress-bar-striped active', role: 'progressbar', style: { width: '20%' } })),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-warning progress-bar-striped active', role: 'progressbar', style: { width: '60%' } })),
              h('div', { className: 'progress' }, h('div', { className: 'progress-bar progress-bar-danger progress-bar-striped active', role: 'progressbar', style: { width: '80%' } }))
            )
          )
        )
      ),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12' },
          h('div', { className: 'panel with-scroll animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Stacked')),
            h('div', { className: 'panel-body' },
              h('div', { className: 'progress' },
                h('div', { className: 'progress-bar progress-bar-success', style: { width: '35%' } }, h('span', { className: 'sr-only' }, '35% Complete (success)')),
                h('div', { className: 'progress-bar progress-bar-warning progress-bar-striped', style: { width: '20%' } }, h('span', { className: 'sr-only' }, '20% Complete (warning)')),
                h('div', { className: 'progress-bar progress-bar-danger', style: { width: '10%' } }, h('span', { className: 'sr-only' }, '10% Complete (danger)'))
              )
            )
          )
        )
      )
    );
  }

  // ========== Notifications Page ==========
  function NotificationsPage() {
    var useState = React.useState;
    var _opts = useState({
      autoDismiss: false,
      positionClass: 'toast-top-right',
      type: 'info',
      timeOut: '5000',
      extendedTimeOut: '2000',
      allowHtml: false,
      closeButton: false,
      tapToDismiss: true,
      progressBar: false,
      newestOnTop: true,
      maxOpened: 0,
      preventDuplicates: false,
      preventOpenDuplicates: false,
      title: 'Some title here',
      msg: 'Type your message here'
    });
    var options = _opts[0];
    var setOptions = _opts[1];

    var _optStr = useState('');
    var optionsStr = _optStr[0];
    var setOptionsStr = _optStr[1];

    function updateOpt(key, value) {
      setOptions(function(prev) {
        var next = Object.assign({}, prev);
        next[key] = value;
        return next;
      });
    }

    function openToast() {
      if (window.toastr) {
        toastr.options = {
          closeButton: options.closeButton,
          positionClass: options.positionClass,
          timeOut: options.timeOut,
          extendedTimeOut: options.extendedTimeOut,
          progressBar: options.progressBar,
          newestOnTop: options.newestOnTop,
          preventDuplicates: options.preventDuplicates,
          tapToDismiss: options.tapToDismiss
        };
        toastr[options.type](options.msg, options.title);
      }
      var strOptions = {};
      Object.keys(options).forEach(function(o) { if (o !== 'msg' && o !== 'title') strOptions[o] = options[o]; });
      setOptionsStr('toastr.' + options.type + "('" + options.msg + "', '" + options.title + "', " + JSON.stringify(strOptions, null, 2) + ')');
    }

    function openRandomToast() {
      var types = ['success', 'error', 'info', 'warning'];
      var quotes = [
        { title: 'Come to Freenode', message: 'We rock at <em>#angularjs</em>' },
        { title: 'Looking for bootstrap?', message: 'Try ui-bootstrap out!' },
        { title: 'Wants a better router?', message: 'We have you covered with ui-router' },
        { title: 'Angular 2', message: 'Is gonna rock the world' },
        { title: null, message: 'Titles are not always needed' },
        { title: null, message: 'Toastr rock!' },
        { title: 'What about nice html?', message: '<strong>Sure you <em>can!</em></strong>' },
        { title: 'Ionic is <em>cool</em>', message: 'Best mobile framework ever' }
      ];
      var type = types[Math.floor(Math.random() * types.length)];
      var quote = quotes[Math.floor(Math.random() * quotes.length)];
      if (window.toastr) {
        toastr[type](quote.message, quote.title);
      }
      setOptionsStr('toastr.' + type + "('" + quote.message + "', '" + quote.title + "')");
    }

    function clearToasts() { if (window.toastr) toastr.clear(); }
    function clearLastToast() { if (window.toastr) toastr.clear(); }

    return h('div', { className: 'panel with-scroll notification-panel animated zoomIn' },
      h('div', { className: 'panel-body' },
        h('div', { className: 'row' },
          h('div', { className: 'col-md-3 col-sm-4' },
            h('div', { className: 'control' },
              h('label', { htmlFor: 'title' }, 'Title'),
              h('input', { type: 'text', className: 'form-control', id: 'title', defaultValue: options.title, onChange: function(e) { updateOpt('title', e.target.value); } })
            ),
            h('div', { className: 'control' },
              h('label', { htmlFor: 'message' }, 'Message'),
              h('textarea', { className: 'form-control', id: 'message', rows: '3', defaultValue: options.msg, onChange: function(e) { updateOpt('msg', e.target.value); } })
            ),
            h('div', { className: 'control-group' },
              h('div', { className: 'control' },
                h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
                  h('input', { type: 'checkbox', id: 'closeButton', checked: options.closeButton, onChange: function(e) { updateOpt('closeButton', e.target.checked); } }),
                  h('span', null, 'Close Button')
                )
              ),
              h('div', { className: 'control' },
                h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
                  h('input', { type: 'checkbox', id: 'html', checked: options.allowHtml, onChange: function(e) { updateOpt('allowHtml', e.target.checked); } }),
                  h('span', null, 'Allow html')
                )
              ),
              h('div', { className: 'control' },
                h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
                  h('input', { type: 'checkbox', id: 'progressBar', checked: options.progressBar, onChange: function(e) { updateOpt('progressBar', e.target.checked); } }),
                  h('span', null, 'Progress bar')
                )
              ),
              h('div', { className: 'control' },
                h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
                  h('input', { type: 'checkbox', id: 'preventDuplicates', checked: options.preventDuplicates, onChange: function(e) { updateOpt('preventDuplicates', e.target.checked); } }),
                  h('span', null, 'Prevent duplicates')
                )
              ),
              h('div', { className: 'control' },
                h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
                  h('input', { type: 'checkbox', id: 'preventOpenDuplicates', checked: options.preventOpenDuplicates, onChange: function(e) { updateOpt('preventOpenDuplicates', e.target.checked); } }),
                  h('span', null, 'Prevent open duplicates')
                )
              ),
              h('div', { className: 'control' },
                h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
                  h('input', { type: 'checkbox', id: 'tapToDismiss', checked: options.tapToDismiss, onChange: function(e) { updateOpt('tapToDismiss', e.target.checked); } }),
                  h('span', null, 'Tap to dismiss')
                )
              ),
              h('div', { className: 'control' },
                h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
                  h('input', { type: 'checkbox', id: 'newestOnTop', checked: options.newestOnTop, onChange: function(e) { updateOpt('newestOnTop', e.target.checked); } }),
                  h('span', null, 'Newest on top')
                )
              )
            )
          ),
          h('div', { className: 'col-md-2 col-sm-3 toastr-radio-setup' },
            h('div', { id: 'toastTypeGroup' },
              h('div', { className: 'controls radio-controls' },
                h('label', { className: 'radio-header' }, 'Toast Type'),
                ['success', 'info', 'warning', 'error'].map(function(t) {
                  return h('label', { className: 'radio custom-radio', key: t },
                    h('input', { type: 'radio', name: 'toasts', value: t, checked: options.type === t, onChange: function() { updateOpt('type', t); } }),
                    h('span', null, t.charAt(0).toUpperCase() + t.slice(1))
                  );
                })
              )
            ),
            h('div', { id: 'positionGroup' },
              h('div', { className: 'controls radio-controls' },
                h('label', { className: 'radio-header position-header' }, 'Position'),
                [
                  ['toast-top-right', 'Top Right'],
                  ['toast-bottom-right', 'Bottom Right'],
                  ['toast-bottom-left', 'Bottom Left'],
                  ['toast-top-left', 'Top Left'],
                  ['toast-top-full-width', 'Top Full Width'],
                  ['toast-bottom-full-width', 'Bottom Full Width'],
                  ['toast-top-center', 'Top Center'],
                  ['toast-bottom-center', 'Bottom Center']
                ].map(function(p) {
                  return h('label', { className: 'radio custom-radio', key: p[0] },
                    h('input', { type: 'radio', name: 'positions', value: p[0], checked: options.positionClass === p[0], onChange: function() { updateOpt('positionClass', p[0]); } }),
                    h('span', null, p[1])
                  );
                })
              )
            )
          ),
          h('div', { className: 'col-md-2 col-sm-3' },
            h('div', { className: 'control' },
              h('label', { htmlFor: 'timeOut' }, 'Time out'),
              h('input', { type: 'text', className: 'form-control', id: 'timeOut', defaultValue: options.timeOut, onChange: function(e) { updateOpt('timeOut', e.target.value); } }),
              h('label', { className: 'sub-label', htmlFor: 'timeOut' }, 'If you set it to 0, it will stick')
            ),
            h('div', { className: 'control' },
              h('label', { htmlFor: 'extendedTimeOut' }, 'Extended time out'),
              h('input', { type: 'text', className: 'form-control', id: 'extendedTimeOut', defaultValue: options.extendedTimeOut, onChange: function(e) { updateOpt('extendedTimeOut', e.target.value); } })
            ),
            h('div', { className: 'control' },
              h('label', { htmlFor: 'maxOpened' }, 'Maximum number of toasts'),
              h('input', { type: 'text', className: 'form-control', id: 'maxOpened', defaultValue: '0', onChange: function(e) { updateOpt('maxOpened', e.target.value); } }),
              h('label', { htmlFor: 'maxOpened', className: 'sub-label' }, '0 means no limit')
            ),
            h('div', { className: 'control' },
              h('label', { className: 'checkbox-inline custom-checkbox nowrap' },
                h('input', { type: 'checkbox', id: 'autoDismiss', checked: options.autoDismiss, onChange: function(e) { updateOpt('autoDismiss', e.target.checked); } }),
                h('span', null, 'Auto dismiss')
              )
            )
          ),
          h('div', { className: 'col-md-5 col-sm-12' },
            h('label', null, 'Result:'),
            h('pre', { className: 'result-toastr', id: 'toastrOptions' }, optionsStr)
          )
        ),
        h('div', { className: 'row' },
          h('div', { className: 'col-md-12 button-row' },
            h('button', { className: 'btn btn-primary', onClick: openToast }, 'Open Toast'),
            h('button', { className: 'btn btn-primary', onClick: openRandomToast }, 'Random Toast'),
            h('button', { className: 'btn btn-danger', onClick: clearToasts }, 'Clear Toasts'),
            h('button', { className: 'btn btn-danger', onClick: clearLastToast }, 'Clear Last Toast')
          )
        )
      )
    );
  }

  // ========== Tabs Page ==========
  function TabsPage() {
    var useState = React.useState;
    var _tab = useState(0);
    var activeTab = _tab[0];
    var setActiveTab = _tab[1];

    return h('div', null,
      h('div', { className: 'row' },
        h('div', { className: 'col-md-6' },
          h('div', { className: 'panel with-scroll horizontal-tabs tabs-panel medium-panel animated zoomIn' },
            h('div', { className: 'panel-body' },
              h('ul', { className: 'nav nav-tabs' },
                h('li', { className: activeTab === 0 ? 'active' : '' }, h('a', { href: '#', onClick: function(e) { e.preventDefault(); setActiveTab(0); } }, 'Start')),
                h('li', { className: activeTab === 1 ? 'active' : '' }, h('a', { href: '#', onClick: function(e) { e.preventDefault(); setActiveTab(1); } }, 'Getting Done'))
              ),
              h('div', { className: 'tab-content' },
                h('div', { className: 'tab-pane' + (activeTab === 0 ? ' active' : ''), style: { display: activeTab === 0 ? 'block' : 'none' } },
                  h('p', null, 'Take up one idea. Make that one idea your life--think of it, dream of it, live on that idea.')
                ),
                h('div', { className: 'tab-pane' + (activeTab === 1 ? ' active' : ''), style: { display: activeTab === 1 ? 'block' : 'none' } },
                  h('p', null, "You can't connect the dots looking forward; you can only connect them looking backwards.")
                )
              )
            )
          )
        )
      )
    );
  }

  // ========== Slider Page ==========
  function SliderPage() {
    return h('div', { className: 'row' },
      h('div', { className: 'col-md-12' },
        h('div', { className: 'panel with-scroll animated zoomIn' },
          h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Ion Range Slider')),
          h('div', { className: 'panel-body' },
            h('div', { className: 'slider-box' }, h('h5', null, 'Basic'), h('div', { className: 'irs-slider' })),
            h('div', { className: 'slider-box' }, h('h5', null, 'With prefix'), h('div', { className: 'irs-slider' })),
            h('div', { className: 'slider-box' }, h('h5', null, 'With postfix'), h('div', { className: 'irs-slider' })),
            h('div', { className: 'slider-box' }, h('h5', null, 'Two way range'), h('div', { className: 'irs-slider' })),
            h('div', { className: 'slider-box' }, h('h5', null, 'With Steps'), h('div', { className: 'irs-slider' })),
            h('div', { className: 'slider-box' }, h('h5', null, 'Decorating numbers'), h('div', { className: 'irs-slider' })),
            h('div', { className: 'slider-box' }, h('h5', null, 'Using custom values array'), h('div', { className: 'irs-slider' })),
            h('div', { className: 'slider-box' }, h('h5', null, 'Disabled'), h('div', { className: 'irs-slider' }))
          )
        )
      )
    );
  }

  // ========== Panels Page ==========
  function PanelsPage() {
    return h('div', null,
      h('h2', null, 'Default panels'),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12 col-lg-4' },
          h('div', { className: 'panel xsmall-panel light-text animated zoomIn' },
            h('div', { className: 'panel-body' }, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac mi erat. Phasellus placerat, elit a laoreet semper, enim ipsum ultricies orci, ac tincidunt tellus massa eu est.')
          )
        ),
        h('div', { className: 'col-md-12 col-lg-4' },
          h('div', { className: 'panel xsmall-panel light-text animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Panel with header')),
            h('div', { className: 'panel-body' }, 'Phasellus maximus venenatis augue, et vestibulum neque aliquam ut.')
          )
        ),
        h('div', { className: 'col-md-12 col-lg-4' },
          h('div', { className: 'panel xsmall-panel with-scroll light-text animated zoomIn' },
            h('div', { className: 'panel-heading clearfix' }, h('h3', { className: 'panel-title' }, 'Panel with header & scroll')),
            h('div', { className: 'panel-body' }, h('p', null, 'Suspendisse nec tellus urna. Sed id est metus.'))
          )
        )
      ),
      h('h2', null, 'Bootstrap panels'),
      h('div', { className: 'row' },
        h('div', { className: 'col-md-12 col-lg-4' },
          h('div', { className: 'panel panel-default bootstrap-panel xsmall-panel' },
            h('div', { className: 'panel-body' },
              h('p', null, 'A panel in bootstrap is a bordered box with some padding around its content.')
            )
          )
        ),
        h('div', { className: 'col-md-12 col-lg-4' },
          h('div', { className: 'panel panel-default bootstrap-panel xsmall-panel' },
            h('div', { className: 'panel-heading' }, 'Panel Heading'),
            h('div', { className: 'panel-body' },
              h('p', { className: 'p-with-code' }, 'The ', h('code', null, '.panel-heading'), ' class adds a heading to the panel.')
            )
          )
        ),
        h('div', { className: 'col-md-12 col-lg-4' },
          h('div', { className: 'panel panel-default bootstrap-panel' },
            h('div', { className: 'panel-body footer-panel' },
              h('p', { className: 'p-with-code' }, 'Wrap buttons or secondary text in ', h('code', null, '.panel-footer'), '.')
            ),
            h('div', { className: 'panel-footer' }, 'Panel Footer')
          )
        )
      ),
      h('h2', null, 'Panels with Contextual Classes'),
      h('div', { className: 'row' },
        ['default', 'primary', 'success', 'info', 'warning', 'danger'].map(function(ctx) {
          return h('div', { className: 'col-md-6 col-lg-4', key: ctx },
            h('div', { className: 'panel panel-' + ctx + ' contextual-example-panel bootstrap-panel' },
              h('div', { className: 'panel-heading' }, 'Panel with panel-' + ctx + ' class'),
              h('div', { className: 'panel-body' }, 'Sample ', h('code', null, '.panel-' + ctx), ' panel')
            )
          );
        })
      )
    );
  }

  // ========== Main App with routing ==========
  function App() {
    var useState = React.useState;
    var useEffect = React.useEffect;

    var _route = useState(window.location.hash.replace('#/ui/', '') || 'typography');
    var route = _route[0];
    var setRoute = _route[1];

    useEffect(function() {
      function onHashChange() {
        var hash = window.location.hash.replace('#/ui/', '');
        setRoute(hash || 'typography');
      }
      window.addEventListener('hashchange', onHashChange);
      return function() { window.removeEventListener('hashchange', onHashChange); };
    }, []);

    switch (route) {
      case 'typography': return h(TypographyPage);
      case 'buttons': return h(ButtonsPage);
      case 'icons': return h(IconsPage);
      case 'modals': return h(ModalsPage);
      case 'grid': return h(GridPage);
      case 'alerts': return h(AlertsPage);
      case 'progressBars': return h(ProgressBarsPage);
      case 'notifications': return h(NotificationsPage);
      case 'tabs': return h(TabsPage);
      case 'slider': return h(SliderPage);
      case 'panels': return h(PanelsPage);
      default: return h('div', null, 'Page not found');
    }
  }

  // Mount/unmount API
  var mountEl = null;
  window.mountUIReact = function(element) {
    mountEl = element;
    ReactDOM.render(h(App), element);
  };
  window.unmountUIReact = function() {
    if (mountEl) {
      ReactDOM.unmountComponentAtNode(mountEl);
      mountEl = null;
    }
  };
})();
