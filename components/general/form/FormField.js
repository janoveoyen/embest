const React = require('react');

module.exports = {

  FormField: function(props) {
    return (
      <div className='form__field'>

        <label className='form__label' for={props.id}>
          {props.labelText}
        </label>

        {props.controlType == 'input' &&
          <input className='form__input' id={props.id} name={props.id}
            type={props.type} />
        }

        {props.controlType == 'select' &&
          <select className='form__select' id={props.id} name={props.id} />
        }

        {props.controlType == 'textarea' &&
          <textarea className='form__textarea' id={props.id} name={props.id} />
        }

      </div>
    );
  }

}
