import { z } from 'zod';
import { zodI18nMap } from 'zod-i18n-map';

// lng and resources key depend on your locale.
z.setErrorMap(zodI18nMap);

// export configured zod instance
export { z };
