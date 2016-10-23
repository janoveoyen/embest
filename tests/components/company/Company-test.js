const React = require('react');
const expect = require('chai').expect;

const Enzyme = require('enzyme');
const shallow = Enzyme.shallow;

let Company = require('./../../../components/company/Company.js').Company;



describe('Company component', function() {



  describe('with no  props', function() {

    const wrapper = shallow(< Company / >)


      it('should contain a wrapper div with class company-panel', function() {
          const expectedClass = 'company-panel';
          assertCorrectElement(wrapper, 'div', expectedClass, {} );
      });


      it('should contain a h2 with class="company-panel__title" ' +
          ' and text "Bedriftsinformasjon"', function() {

          const h2 = wrapper.childAt(0);
          const expectedClass = 'company-panel__title';

          assertCorrectElement(h2, 'h2', expectedClass, {} );

          expect(h2.text()).to.equal('Bedriftsinformasjon');

      });


      it('should contain a label with class="company-panel__label" ' +
          'and for="company-name"',  function() {

        const label = wrapper.childAt(1);
        const expectedClass = 'company-panel__label';
        const expectedProp = {'for': 'company-name'}

        assertCorrectElement( label, 'label', expectedClass, expectedProp);

      });


      it('should contain an input with class company-panel__input ' +
          'and type="text" and name="company-name"', function() {

        const input = wrapper.childAt(2);
        const expectedClass = 'company-panel__input';

        assertCorrectElement( input, 'input', expectedClass, {} );

      });

  });

  function assertCorrectElement(el, expectType, expectClass, expectProps) {
    const missingClassMsg = 'missing class ' + expectClass;

    expect(el.type()).to.equal(expectType);
    expect(el.hasClass(expectClass)).to.equal(true, missingClassMsg);

    for (let prop in expectProps) {
      expect(el.prop(prop)).to.equal(expectProps[prop]);
    }

  }

});
