const React = require('react');

module.exports = {

  Company: function(props) {
    return (
      <div className='panel'>
        <h2 className='panel__title'>Bedriftsinformasjon</h2>
        <form className='form'>
          <div className='form__field'>
            <label className='form__label' for='company-orgnr'>Org.nr</label>
            <input className='form__input' type='text'  name='company-orgnr'
              id='company-orgnr' />
          </div>
          <div className='form__field'>
            <label className='form__label' for='company-name'>Bedriftsnavn</label>
            <input className='form__input' type='text' name='company-name'
              id='company-name'/>
          </div>
          <div className='form__field'>
            <label className='form__label' for='company-salesperson'>Selger</label>
            <select className='form__select' name='company-salesperson'
              id='company-salesperson'></select>
          </div>
          <div className='form__field'>
            <label className='form__label' for='company-phone'>Telefon</label>
            <input className='form__input' type='tel' name='company-phone'
              id='company-phone'/>
          </div>
          <div className='form__field'>
            <label className='form__label' for='company-email'>E-post</label>
            <input className='form__input' type='email' name='company-email'
              id='company-email'></input>
          </div>
          <div className='form__field'>
            <label className='form__label' for='company-mailingaddress'>
              Fakturaadresse
            </label>
            <textarea className='form__textarea' name='company-mailingaddress'
              id='company-mailingaddress'></textarea>
          </div>
        </form>
      </div>
    );
  }

}
