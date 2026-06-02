/**
 * TypographyPage — React migration of src/app/pages/ui/typography.
 *
 * Static content page. The ba-panel directives are pre-resolved into their
 * rendered DOM (outer element with `ba-panel-title`, inner `.panel` with the
 * `ba-panel-class` value) so the framework-agnostic E2E selectors keep working.
 */
import React from 'react';

var LOREM = 'Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat vestibulum eleifend pellentesque.';

var HTML = ''
  + '<div class="typography-document-samples row-fluid">'

  + '  <div class="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget" ba-panel-title="Text Size">'
  + '    <div class="panel with-scroll heading-widget">'
  + '      <div class="panel-heading clearfix"><h3 class="panel-title">Text Size</h3></div>'
  + '      <div class="panel-body">'
  + '        <div class="section-block"><h1>H1. Heading 1</h1><p>' + LOREM + '</p></div>'
  + '        <div class="section-block"><h2>H2. Heading 2</h2><p>' + LOREM + '</p></div>'
  + '        <div class="section-block"><h3>H3. Heading 3</h3><p>' + LOREM + '</p></div>'
  + '        <div class="section-block"><h4>H4. Heading 4</h4><p>' + LOREM + '</p></div>'
  + '        <div class="section-block"><h5>H5. Heading 5</h5><p>' + LOREM + '</p></div>'
  + '      </div>'
  + '    </div>'
  + '  </div>'

  + '  <div class="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget" ba-panel-title="Some more text">'
  + '    <div class="panel with-scroll more-text-widget">'
  + '      <div class="panel-heading clearfix"><h3 class="panel-title">Some more text</h3></div>'
  + '      <div class="panel-body">'
  + '        <div class="section-block light-text"><p>' + LOREM + '</p></div>'
  + '        <div class="section-block regular-text"><p>' + LOREM + '</p></div>'
  + '        <div class="section-block upper-text bold-text"><p>' + LOREM + '</p></div>'
  + '        <div class="section-block bold-text"><p>' + LOREM + '</p></div>'
  + '        <div class="section-block small-text"><p>Secondary text. ' + LOREM + '</p></div>'
  + '      </div>'
  + '    </div>'
  + '  </div>'

  + '  <div class="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget" ba-panel-title="Lists">'
  + '    <div class="panel with-scroll lists-widget">'
  + '      <div class="panel-heading clearfix"><h3 class="panel-title">Lists</h3></div>'
  + '      <div class="panel-body">'
  + '        <div class="section-block">'
  + '          <h5 class="list-header">Unordered list:</h5>'
  + '          <ul class="blur">'
  + '            <li>Lorem ipsum dolor sit amet</li>'
  + '            <li>Сlacinia scelerisque pharetra<ul><li>Dui rhoncus quisque integer lorem<ul><li>Libero iaculis vestibulum eu vitae</li></ul></li></ul></li>'
  + '            <li>Nisl lectus nibh habitasse suspendisse ut</li>'
  + '            <li><span>Posuere cursus hac, vestibulum wisi nulla bibendum</span></li>'
  + '          </ul>'
  + '          <h5 class="list-header">Ordered Lists:</h5>'
  + '          <ol class="blur">'
  + '            <li><span>Eu non nec cursus quis mollis, amet quam nec</span></li>'
  + '            <li><span>Et suspendisse, adipiscing fringilla ornare sit ligula sed</span><ol><li><span>Interdum et justo nulla</span><ol><li><span>Magna amet, suscipit suscipit non amet</span></li></ol></li></ol></li>'
  + '            <li><span>Metus duis eu non eu ridiculus turpis</span></li>'
  + '            <li><span>Neque egestas id fringilla consectetuer justo curabitur</span></li>'
  + '          </ol>'
  + '          <div class="accent">Important text fragment. ' + LOREM + '</div>'
  + '        </div>'
  + '      </div>'
  + '    </div>'
  + '  </div>'

  + '  <div class="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget" ba-panel-title="Text Color">'
  + '    <div class="panel with-scroll color-widget">'
  + '      <div class="panel-heading clearfix"><h3 class="panel-title">Text Color</h3></div>'
  + '      <div class="panel-body">'
  + '        <div class="section-block red-text"><p>' + LOREM + '</p></div>'
  + '        <div class="section-block yellow-text"><p>' + LOREM + '</p></div>'
  + '        <div class="section-block links"><p>Lorem ipsum <a href>dolor</a> sit amet, <a href>ullamcorper</a> ligula sodales at, <a href>mattis</a> vel eros.</p></div>'
  + '        <div class="section-block links"><p><a href>Active link — #209e91</a></p><p class="hovered"><a href>Hover link — #17857a</a></p></div>'
  + '      </div>'
  + '    </div>'
  + '  </div>'
  + '</div>'

  + '<div class="row-fluid">'
  + '  <div class="col-lg-12 col-sm-12 col-xs-12">'
  + '    <div><div class="panel banner-column-panel"><div class="panel-body">'
  + '      <div class="banner">'
  + '        <div class="large-banner-wrapper"><img src="assets/img/app/typography/banner.png" alt=""/></div>'
  + '        <div class="banner-text-wrapper"><div class="banner-text">'
  + '          <h1>Simple Banner Text</h1><p>Lorem ipsum dolor sit amet</p><p>Odio amet viverra rutrum</p>'
  + '        </div></div>'
  + '      </div>'
  + '      <div class="section">'
  + '        <h2>Columns</h2>'
  + '        <div class="row">'
  + '          <div class="col-sm-6"><div class="img-wrapper"><img src="assets/img/app/typography/typo03.png" alt=""/></div><p>Vel elit, eros elementum, id lacinia, duis non ut ut tortor blandit.</p></div>'
  + '          <div class="col-sm-6"><div class="img-wrapper"><img src="assets/img/app/typography/typo01.png" alt=""/></div><p>Et suspendisse, adipiscing fringilla ornare sit ligula sed.</p></div>'
  + '        </div>'
  + '        <div class="separator"></div>'
  + '        <div class="row">'
  + '          <div class="col-sm-4"><h4>Column heading example</h4><div class="img-wrapper"><img src="assets/img/app/typography/typo04.png" alt=""/></div><p>Eget augue, lacus erat ante egestas scelerisque aliquam.</p><a href class="learn-more">Lean more</a></div>'
  + '          <div class="col-sm-4"><h4>Yet another column heading example</h4><div class="img-wrapper"><img src="assets/img/app/typography/typo05.png" alt=""/></div><p>Augue massa et parturient, suspendisse orci nec scelerisque sit.</p><a href class="learn-more">Lean more</a></div>'
  + '          <div class="col-sm-4"><h4>Third column heading example</h4><div class="img-wrapper"><img src="assets/img/app/typography/typo06.png" alt=""/></div><p>Eget turpis, tortor lobortis porttitor, vestibulum nullam vehicula aliquam.</p><a href class="learn-more">Lean more</a></div>'
  + '        </div>'
  + '        <div class="separator"></div>'
  + '      </div>'
  + '    </div></div></div>'
  + '  </div>'
  + '</div>';

export function TypographyPage() {
  return React.createElement('div', { dangerouslySetInnerHTML: { __html: HTML } });
}
