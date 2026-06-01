import React from 'react';
import Panel from './Panel';

var IMAGES_ROOT = 'assets/img/';

function Typography() {
  return (
    <div>
      <div className="typography-document-samples row-fluid">
        <div className="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget">
          <Panel panelClass="with-scroll heading-widget" title="Text Size">
            <div className="section-block">
              <h1>H1. Heading 1</h1>
              <p>Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat
                vestibulum eleifend pellentesque.</p>
            </div>
            <div className="section-block">
              <h2>H2. Heading 2</h2>
              <p>Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat
                vestibulum eleifend pellentesque.</p>
            </div>
            <div className="section-block">
              <h3>H3. Heading 3</h3>
              <p>Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra, placerat
                vestibulum eleifend pellentesque.</p>
            </div>
            <div className="section-block">
              <h4>H4. Heading 4</h4>
              <p>Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra,.</p>
            </div>
            <div className="section-block">
              <h5>H5. Heading 5</h5>
              <p>Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar, lacinia scelerisque pharetra.</p>
            </div>
          </Panel>
        </div>

        <div className="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget">
          <Panel panelClass="with-scroll more-text-widget" title="Some more text">
            <div className="section-block light-text">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis
                ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed
                ornare nulla. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis.</p>
            </div>
            <div className="section-block regular-text">
              <p>Curabitur bibendum ornare dolor, quis ullamcorper ligula dfgz`zzsodales at. Nullam quis risus eget urna
                mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Nullam id dolor id.</p>
            </div>
            <div className="section-block upper-text bold-text">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis
                ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare
                nulla. </p>
            </div>
            <div className="section-block bold-text">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis
                ullam-corper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare
                nulla.</p>
            </div>
            <div className="section-block small-text">
              <p>Secondary text. Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar,</p>
              <p>lacinia scelerisque pharetra, placerat vestibulum eleifend</p>
              <p> pellentesque, mi nam.</p>
            </div>
          </Panel>
        </div>

        <div className="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget">
          <Panel panelClass="with-scroll lists-widget" title="Lists">
            <div className="section-block">
              <h5 className="list-header">Unordered list:</h5>
              <ul className="blur">
                <li>Lorem ipsum dolor sit amet</li>
                <li>Clacinia scelerisque pharetra
                  <ul>
                    <li>Dui rhoncus quisque integer lorem
                      <ul>
                        <li>Libero iaculis vestibulum eu vitae</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>Nisl lectus nibh habitasse suspendisse ut</li>
                <li><span>Posuere cursus hac, vestibulum wisi nulla bibendum</span></li>
              </ul>
              <h5 className="list-header">Ordered Lists:</h5>
              <ol className="blur">
                <li><span>Eu non nec cursus quis mollis, amet quam nec</span></li>
                <li><span>Et suspendisse, adipiscing fringilla ornare sit ligula sed</span>
                  <ol>
                    <li><span>Interdum et justo nulla</span>
                      <ol>
                        <li><span>Magna amet, suscipit suscipit non amet</span></li>
                      </ol>
                    </li>
                  </ol>
                </li>
                <li><span>Metus duis eu non eu ridiculus turpis</span></li>
                <li><span>Neque egestas id fringilla consectetuer justo curabitur, wisi magna neque commodo volutpat</span></li>
              </ol>
              <div className="accent">Important text fragment. Lorem ipsum dolor sit amet, id mollis iaculis mi nisl pulvinar,
                lacinia scelerisque pharetra.</div>
            </div>
          </Panel>
        </div>

        <div className="col-xlg-3 col-lg-6 col-md-6 col-sm-6 col-xs-12 typography-widget">
          <Panel panelClass="with-scroll color-widget" title="Text Color">
            <div className="section-block red-text">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor, quis
                ullamcorper ligula sodales at. Nulla tellus elit, varius non commodo eget, mattis vel eros. In sed ornare
                nulla. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus.</p>
            </div>
            <div className="section-block yellow-text">
              <p>Curabitur bibendum ornare dolor, quis ullamcorper ligula dfgz`zzsodales at. Nullam quis risus eget urna
                mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Nullam id dolor id nibh ultricies vehicula ut id elit. In sed ornare nulla.</p>
            </div>
            <div className="section-block links">
              <p>Lorem ipsum <a href="#">dolor</a> sit amet, consectetur adipiscing elit. Curabitur bibendum ornare dolor,
                quis <a href="#">ullamcorper</a> ligula sodales at. Nulla tellus elit, varius non commodo eget, <a href="#">mattis</a> vel eros. In sed ornare nulla.</p>
            </div>
            <div className="section-block links">
              <p><a href="#">Active link &#8212; #209e91</a></p>
              <p className="hovered"><a href="#">Hover link &#8212; #17857a</a></p>
            </div>
          </Panel>
        </div>
      </div>

      <div className="row-fluid">
        <div className="col-lg-12 col-sm-12 col-xs-12">
          <Panel panelClass="banner-column-panel">
            <div className="banner">
              <div className="large-banner-wrapper">
                <img src={IMAGES_ROOT + 'app/typography/banner.png'} alt="" />
              </div>
              <div className="banner-text-wrapper">
                <div className="banner-text">
                  <h1>Simple Banner Text</h1>
                  <p>Lorem ipsum dolor sit amet</p>
                  <p>Odio amet viverra rutrum</p>
                </div>
              </div>
            </div>
            <div className="section">
              <h2>Columns</h2>
              <div className="row">
                <div className="col-sm-6">
                  <div className="img-wrapper"><img src={IMAGES_ROOT + 'app/typography/typo03.png'} alt="" title="" /></div>
                  <p>Vel elit, eros elementum, id lacinia, duis non ut ut tortor blandit. Mauris <a href="#">dapibus</a> magna rutrum. Ornare neque suspendisse <a href="#">phasellus wisi</a>, quam cras pede rutrum suspendisse, <a href="#">felis amet eu</a>. Congue magna elit quisque quia, nullam justo sagittis, ante erat libero placerat, proin condimentum consectetuer lacus. Velit condimentum velit, sed penatibus arcu nulla.</p>
                </div>
                <div className="col-sm-6">
                  <div className="img-wrapper"><img src={IMAGES_ROOT + 'app/typography/typo01.png'} alt="" title="" /></div>
                  <p>Et suspendisse, adipiscing fringilla ornare sit ligula sed, vel nam. Interdum et justo nulla, fermentum lobortis purus ut eu, duis nibh dolor massa tristique elementum, nibh iste potenti risus fusce aliquet fusce, ullamcorper debitis primis arcu tellus vestibulum ac.</p>
                </div>
              </div>
              <div className="separator"></div>
              <div className="row">
                <div className="col-sm-4">
                  <h4>Column heading example</h4>
                  <div className="img-wrapper"><img src={IMAGES_ROOT + 'app/typography/typo04.png'} alt="" /></div>
                  <p>Eget augue, lacus erat ante egestas scelerisque aliquam, metus molestie leo in habitasse magna maecenas</p>
                  <a href="#" className="learn-more">Lean more</a>
                </div>
                <div className="col-sm-4">
                  <h4>Yet another column heading example</h4>
                  <div className="img-wrapper"><img src={IMAGES_ROOT + 'app/typography/typo05.png'} alt="" /></div>
                  <p>Augue massa et parturient, suspendisse orci nec scelerisque sit, integer nam mauris pede consequat in velit</p>
                  <a href="#" className="learn-more">Lean more</a>
                </div>
                <div className="col-sm-4">
                  <h4>Third column heading example</h4>
                  <div className="img-wrapper"><img src={IMAGES_ROOT + 'app/typography/typo06.png'} alt="" /></div>
                  <p>Eget turpis, tortor lobortis porttitor, vestibulum nullam vehicula aliquam</p>
                  <a href="#" className="learn-more">Lean more</a>
                </div>
              </div>
              <div className="separator"></div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default Typography;
