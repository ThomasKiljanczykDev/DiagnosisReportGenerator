import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/pl/zod.json';

import translationPl from '../public/locales/pl/translation.json';

const resources = {
    pl: {
        translation: translationPl,
        zod: translation
    }
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: resources,
        lng: 'pl',
        interpolation: {
            escapeValue: false
        }
    });

z.setErrorMap(zodI18nMap);

export default i18n;
