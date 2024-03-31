import { Route, Routes } from 'react-router-dom';

import Redirect from '@/renderer/components/Redirect';
import DiagnosesSettings from '@/renderer/pages/settings/diagnoses/DiagnosesSettings';
import DiseasesSettings from '@/renderer/pages/settings/diseases/DiseasesSettings';
import GenesSettings from '@/renderer/pages/settings/genes/GenesSettings';
import RecommendationsSettings from '@/renderer/pages/settings/recommendations/RecommendationsSettings';
import StaffSettings from '@/renderer/pages/settings/staff/StaffSettings';

export default function Settings() {
    return (
        <Routes>
            <Route element={<Redirect to="/genes" />} path="/" />
            <Route element={<StaffSettings />} path="/staff" />
            <Route element={<DiagnosesSettings />} path="/diagnoses" />
            <Route element={<RecommendationsSettings />} path="/recommendations" />
            <Route element={<GenesSettings />} path="/genes" />
            <Route element={<DiseasesSettings />} path="/diseases" />
        </Routes>
    );
}
