import React from 'react';
import { PropTypes } from "prop-types";
import { supportedLocales } from "../../config/i18n";
import Select from 'react-select';

const LanguageSelector = ({locale, onSetLocale}) => {

    const onChangeLanguage = selected => {
          onSetLocale(selected.value);
    };
    
    const data = Object.keys(supportedLocales).map(lang => {
        return {
            value: lang,
            label: supportedLocales[lang]
        };
    });
    
    const defLang = data.findIndex(row => row.value === locale);
    
    return (
        <Select 
            defaultValue={data[defLang]}
            onChange={onChangeLanguage}
            options={data}
            className="language-selector"
        />
    );
};

LanguageSelector.propTypes = {
  locale: PropTypes.string.isRequired,
  onSetLocale: PropTypes.func.isRequired
};

export default LanguageSelector;
