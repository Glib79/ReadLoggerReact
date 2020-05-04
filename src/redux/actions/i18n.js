import { setLocale } from "react-redux-i18n";
import { supportedLocales, fallbackLocale } from "../../config/i18n";

export const setLocaleWithFallback = (desiredLocale) => dispatch => {
  const finalLocale = Object.keys(supportedLocales).includes(desiredLocale)
    ? desiredLocale
    : fallbackLocale;

  dispatch(setLocale(finalLocale));
}