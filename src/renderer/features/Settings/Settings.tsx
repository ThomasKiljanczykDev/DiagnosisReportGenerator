import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Redirect from '@/renderer/components/Redirect';

const DiagnosesSettings = lazy(
    () => import('@/renderer/features/Settings/diagnoses/DiagnosesSettings')
);
const DiseasesSettings = lazy(
    () => import('@/renderer/features/Settings/diseases/DiseasesSettings')
);
const GenesSettings = lazy(() => import('@/renderer/features/Settings/genes/GenesSettings'));
const RecommendationsSettings = lazy(
    () => import('@/renderer/features/Settings/recommendations/RecommendationsSettings')
);
const StaffSettings = lazy(() => import('@/renderer/features/Settings/staff/StaffSettings'));

export default function Settings() {
    return (
        <Suspense>
            <Routes>
                <Route element={<Redirect to="/genes" />} path="/" />
                <Route element={<StaffSettings />} path="/staff" />
                <Route element={<DiagnosesSettings />} path="/diagnoses" />
                <Route element={<RecommendationsSettings />} path="/recommendations" />
                <Route element={<GenesSettings />} path="/genes" />
                <Route element={<DiseasesSettings />} path="/diseases" />
            </Routes>
        </Suspense>
    );
}
