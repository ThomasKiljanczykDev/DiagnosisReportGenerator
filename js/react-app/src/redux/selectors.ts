import { diagnosesAdapter } from '@/redux/slices/settings/diagnoses';
import { genesAdapter } from '@/redux/slices/settings/genes';
import { illnessesAdapter } from '@/redux/slices/settings/illnesses';
import { mutationsAdapter } from '@/redux/slices/settings/mutations';
import { recommendationAdapter } from '@/redux/slices/settings/recommendations';
import { staffAdapter } from '@/redux/slices/settings/staff';
import { testMethodsAdapter } from '@/redux/slices/settings/test-methods';
import type { RootState } from '@/redux/store';

export const diagnosesSelectors = diagnosesAdapter.getSelectors(
    (state: RootState) => state.settings.diagnoses
);

export const genesSelectors = genesAdapter.getSelectors((state: RootState) => state.settings.genes);

export const staffSelectors = staffAdapter.getSelectors((state: RootState) => state.settings.staff);

export const testMethodsSelectors = testMethodsAdapter.getSelectors(
    (state: RootState) => state.settings.testMethods
);

export const recommendationsSelectors = recommendationAdapter.getSelectors(
    (state: RootState) => state.settings.recommendations
);

export const mutationsSelectors = mutationsAdapter.getSelectors(
    (state: RootState) => state.settings.mutations
);

export const illnessesSelectors = illnessesAdapter.getSelectors(
    (state: RootState) => state.settings.illnesses
);
