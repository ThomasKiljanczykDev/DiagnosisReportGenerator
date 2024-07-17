import { diagnosesAdapter } from '@/common/redux/slices/settings/diagnoses';
import { genesAdapter } from '@/common/redux/slices/settings/genes';
import { illnessesAdapter } from '@/common/redux/slices/settings/illnesses';
import { mutationsAdapter } from '@/common/redux/slices/settings/mutations';
import { recommendationAdapter } from '@/common/redux/slices/settings/recommendations';
import { staffAdapter } from '@/common/redux/slices/settings/staff';
import { testMethodsAdapter } from '@/common/redux/slices/settings/test-methods';
import type { RootState } from '@/common/redux/store';

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
