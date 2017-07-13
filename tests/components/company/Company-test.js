const React = require('react');
const expect = require('chai').expect;

const Enzyme = require('enzyme');
const shallow = Enzyme.shallow;

let Company = require('./../../../components/company/Company.js').Company;



describe('Company component', function() {

  let wrapper;
  let form;

  describe('with no props', function() {
    wrapper = shallow(< Company / >)
    form = wrapper.childAt(1);
console.log(wrapper.debug())

      it('should contain a <div class="panel" />', function() {

        const expectedWrapper = {
          'type' : 'div',
          'class' : 'panel'
        }
        assertCorrectElement(wrapper, expectedWrapper);
      });


      it('should contain a <h2 class="panel__title">Bedriftsinformasjon</h2>',
        function() {

        const h2 = wrapper.childAt(0);
        const expectedH2 = {
          'type' : 'h2',
          'class' : 'panel__title',
          'text' : 'Bedriftsinformasjon'
        }

        assertCorrectElement(h2, expectedH2);

      });


      it('should contain a <form class="form" />', function() {

        const expectedForm = {
          'type' : 'form',
          'class' : 'form'
        }

        assertCorrectElement( form, expectedForm);

      });

      it('should contain a ' +
        '<div class="form__field">' +
        '<label class="form__label" for="company-orgnr">Org.nr</label>' +
        '<input class="form__input" type="text" name="company-orgnr"' +
        ' id="company-orgnr" />' +
        '</div>', function() {

        const fieldPosition = 0;

        const expectedLabel = {
          'type' : 'label',
          'class':'form__label',
          'text':'Org.nr',
          'expectedProps' : {
            'for' : 'company-orgnr'
          }
        }

        const expectedControl = {
          'type' : 'input',
          'class': 'form__input',
          'expectedProps' : {
            'type': 'text',
            'name': 'company-orgnr',
            'id': 'company-orgnr'
          }
        }

        const expectedField = {
          'class' : 'form__field',
          'label' : expectedLabel,
          'control' : expectedControl
        }

        assertCorrectField(fieldPosition, expectedField);
      });

      it('should contain a ' +
        '<div class="form__field">' +
        '<label class="form__label" for="company-name">Bedriftsnavn</label>' +
        '<input class="form__input" type="text" name="company-name"' +
        ' id="company-name" />' +
        '</div>', function() {

        const fieldPosition = 1;

        const expectedLabel = {
          'type' : 'label',
          'class':'form__label',
          'text':'Bedriftsnavn',
          'expectedProps' : {
            'for' : 'company-name'
          }
        }

        const expectedControl = {
          'class':'form__input',
          'type' : 'input',
          'expectedProps' : {
            'type' : 'text',
            'name' : 'company-name',
            'id' : 'company-name'
          }
        }

        const expectedField = {
          'class' : 'form__field',
          'label' : expectedLabel,
          'control' : expectedControl
        }

        assertCorrectField(fieldPosition, expectedField);

      });

      it('should contain a ' +
        '<div class="form__field">' +
        '<label class="form__label" for="company-salesperson">Selger</label>' +
        '<select class="form__select" name="company-salesperson"'+
        ' id="company-salesperson" />' +
        '</div>', function() {

        const fieldPosition = 2;

        const expectedLabel = {
          'type' : 'label',
          'class':'form__label',
          'text':'Selger',
          'expectedProps' : {
            'for' : 'company-salesperson'
          }
        }

        const expectedControl = {
          'class':'form__select',
          'type' : 'select',
          'expectedProps' : {
            'name' : 'company-salesperson',
            'id' : 'company-salesperson'
          }
        }

        const expectedField = {
          'class' : 'form__field',
          'label' : expectedLabel,
          'control' : expectedControl
        }

        assertCorrectField(fieldPosition, expectedField);

      });

    it('should contain a ' +
      '<div class="form__field">' +
      '<label class="form__label" for="company-phone">Telefon</label>' +
      '<input class="form__input" type="tel" name="company-phone"' +
      ' id="company-phone" />' +
      '</div>', function() {

      const fieldPosition = 3;

      const expectedLabel = {
        'type' : 'label',
        'class':'form__label',
        'text':'Telefon',
        'expectedProps' : {
          'for' : 'company-phone'
        }
      }

      const expectedControl = {
        'class':'form__input',
        'type' : 'input',
        'expectedProps' : {
          'type' : 'tel',
          'name' : 'company-phone',
          'id' : 'company-phone'
        }
      }

      const expectedField = {
        'class' : 'form__field',
        'label' : expectedLabel,
        'control' : expectedControl
      }

      assertCorrectField(fieldPosition, expectedField);

    });

    it('should contain a ' +
      '<div class="form__field">' +
      '<label class="form__label" for="company-email">E-post</label>' +
      '<input class="form__input" type="email" name="company-email"' +
      ' id="company-email" />' +
      '</div>', function() {

      const fieldPosition = 4;

      const expectedLabel = {
        'type' : 'label',
        'class':'form__label',
        'text':'E-post',
        'expectedProps' : {
          'for' : 'company-email'
        }
      }

      const expectedControl = {
        'class':'form__input',
        'type' : 'input',
        'expectedProps' : {
          'type' : 'email',
          'name' : 'company-email',
          'id' : 'company-email'
        }
      }

      const expectedField = {
        'class' : 'form__field',
        'label' : expectedLabel,
        'control' : expectedControl
      }

      assertCorrectField(fieldPosition, expectedField);

    });

      it('should contain a ' +
        '<div class="form__field">' +
        '<label class="form__label" for="company-mailingaddress">' +
        'Fakturaadresse</label>' +
        '<textarea class="form__textarea" name="company-mailingaddress"' +
        ' id="company-mailingaddress" />' +
        '</div>', function() {

        const fieldPosition = 5;

        const expectedLabel = {
          'type' : 'label',
          'class':'form__label',
          'text':'Fakturaadresse',
          'expectedProps' : {
            'for' : 'company-mailingaddress'
          }
        }

        const expectedControl = {
          'class':'form__textarea',
          'type' : 'textarea',
          'expectedProps' : {
            'name' : 'company-mailingaddress',
            'id' : 'company-mailingaddress'
          }
        }

        const expectedField = {
          'class' : 'form__field',
          'label' : expectedLabel,
          'control' : expectedControl
        }

        assertCorrectField(fieldPosition, expectedField);

      });

  });


  function assertCorrectField(fieldPosition, expectedField) {

      const field = form.childAt(fieldPosition);
      const expectedClass = expectedField.class;
      const label = field.childAt(0);
      const control = field.childAt(1);

      const missingClassMsg = "Missing class " + expectedClass;
      expect(field.hasClass(expectedClass)).to.equal(true, missingClassMsg);

      assertCorrectElement(label, expectedField.label);
      assertCorrectElement(control, expectedField.control);
  }

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
