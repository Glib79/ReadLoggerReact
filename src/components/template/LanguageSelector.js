import React from 'react';
import { PropTypes } from "prop-types";
import Form from 'react-bootstrap/Form';
import { supportedLocales } from "../../config/i18n";

const LanguageSelector = ({locale, onSetLocale}) => {

  const onChangeLanguage = e => {
    onSetLocale(e.target.value);
  };

  return (
    <Form.Control as="select" value={locale} onChange={onChangeLanguage}>
      {Object.keys(supportedLocales).map(language => 
        <option key={language} value={language}>{supportedLocales[language]}</option>
      )}
    </Form.Control>
  );
};

LanguageSelector.propTypes = {
  locale: PropTypes.string.isRequired,
  onSetLocale: PropTypes.func.isRequired
};

export default LanguageSelector;
