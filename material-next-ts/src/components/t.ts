import React from "react";
import AccountBox from "@mui/icons-material/AccountBox";
import { makeTranslator, createMap } from '@ui-schema/ui-schema';
import * as en from '@ui-schema/dictionary/en'
import * as de from '@ui-schema/dictionary/de'

const icons = {
  'AccountBox': () => typeof AccountBox
};
console.log('en errors', en.errors["required-not-set"] = 'Campo obligatorio')
const dicEN = createMap({
  error: en.errors,
  labels: { ...en.labels, ...en.dnd },
  widget: {
    stepper: {
      "step-1": {
        surname: { title: "Surname" }
      }
    },
    qty: { title: "Quantity" },
  },
  icons,
});

const dicDE = createMap({
  error: de.errors,
  labels: { ...de.labels, ...de.dnd },
  widget: {
    stepper: {
      "step-1": {
        surname: { title: "Nachname" }
      }
    },
    headline: { title: "Überschrift" },
    qty: { title: "Anzahl" },
    length: { title: "Länge" },
  },
  icons,
});
//@ts-ignore
const tEN = makeTranslator(dicEN, 'en');
//@ts-ignore
const tDE = makeTranslator(dicDE, 'de');
const getDefaultLocale = () => {
  // Return the default locale here
  return 'en'; // English as the default locale
};

const browserT = (text: any, context: any, schema: any) => {
  if (typeof window !== 'undefined') {
    const locale = window.localStorage.getItem('locale') || navigator.language;
    return locale === 'de' ? tDE(text, context, schema) : tEN(text, context, schema);
  } else {
    // In a non-browser environment (e.g., Node.js), use the default locale
    const defaultLocale = getDefaultLocale();
    return defaultLocale === 'de' ? tDE(text, context, schema) : tEN(text, context, schema);
  }
};

export { browserT }