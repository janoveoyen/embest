const React = require('react');
const expect = require('chai').expect;

const Enzyme = require('enzyme');
const shallow = Enzyme.shallow;

let FormField =
  require('./../../../components/general/form/FormField.js').FormField;

describe('FormField component', function() {

  let wrapper;

  it('should have wrapper div with class form__field', function() {

    wrapper = shallow(< FormField / >);

    const expectedElement = {
      'type' : 'div',
      'class' : 'form__field'
    }

    assertCorrectElement(wrapper, expectedElement);

  });

  it ('should have a label with class form__label, ' +
      'text from prop "labelText", and "for" from prop "id"',
    function() {

    let props = {
      "labelText": "test-labelText",
      "id" : "test-input-id"
    }

    wrapper = shallow(< FormField {...props}/ >);
    let label = wrapper.childAt(0);

    const expectedElement = {
      type : 'label',
      class : 'form__label',
      text : 'test-labelText',
      expectedProps : {
        'for' : 'test-input-id'
      }
     }
    assertCorrectElement(label, expectedElement);

  });

  describe("with prop controlType='input'", function () {

    it('should have a single control of type input, ' +
       'with class form__input, ' +
       'type from prop "type"' +
       'and name+id from prop "id"', function() {

      let props = {
         controlType: 'input',
         id : "test-input-id",
         type : "text"
      }

      wrapper = shallow(< FormField {...props}/ >);
      let input = wrapper.childAt(1);

      const expectedElement = {
        type : 'input',
        class : 'form__input',
        expectedProps : {
          id : "test-input-id",
          name: "test-input-id",
          type: "text"
        }
       }

       assertCorrectElement(input, expectedElement);

       let numChildren = wrapper.children().length;
       expect(numChildren).to.equal(2, "Too many controls");


    });

  });

  describe("with prop controlType='select'", function () {

    it('should have a single control of type select, ' +
       'with class form__select, '+
       'and name+id from prop "id"', function() {

       let props = {
          controlType: 'select',
          id : "test-select-id"
       }

       wrapper = shallow(< FormField {...props}/ >);
       let select = wrapper.childAt(1);

       const expectedElement = {
         type : 'select',
         class : 'form__select',
         expectedProps : {
           id : "test-select-id",
           name: "test-select-id"
         }
        }

        assertCorrectElement(select, expectedElement);

        let numChildren = wrapper.children().length;
        expect(numChildren).to.equal(2, "Too many controls");

    });

  });

  describe("with prop controlType='textarea'", function () {

    it('should have a single control of type textarea, ' +
       'with class form__textarea, '+
       'and name+id from prop "id"', function() {

       let props = {
          controlType: 'textarea',
          id : "test-textarea-id"
       }

       wrapper = shallow(< FormField {...props}/ >);
       let textarea = wrapper.childAt(1);

       const expectedElement = {
         type : 'textarea',
         class : 'form__textarea',
         expectedProps : {
           id : "test-textarea-id",
           name: "test-textarea-id"
         }
        }

        assertCorrectElement(textarea, expectedElement);

        let numChildren = wrapper.children().length;
        expect(numChildren).to.equal(2, "Too many controls");

    });

  });



  function assertCorrectElement(el, expectedElement) {
    const expectedClass = expectedElement.class;
    const missingClassMsg = "Missing class " + expectedClass;
    expect(el.type()).to.equal(expectedElement.type);
    expect(el.hasClass(expectedClass)).to.equal(true, missingClassMsg);

    if (expectedElement.text) {
      expect(el.text()).to.equal(expectedElement.text);
    }

    for (let prop in expectedElement.expectedProps) {
      expect(el.prop(prop)).to.equal(expectedElement.expectedProps[prop]);
    }

  }

});
