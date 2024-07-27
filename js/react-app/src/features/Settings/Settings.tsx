import { Suspense, lazy } from 'react';

import { Route, Routes } from 'react-router-dom';

import Redirect from '@/components/Redirect';
import MutationsSettings from '@/features/Settings/mutations/MutationsSettings';
import TestMethodsSettings from '@/features/Settings/test-methods/TestMethodsSettings';

const DiagnosesSettings = lazy(() => import('@/features/Settings/diagnoses/DiagnosesSettings'));
const IllnessesSettings = lazy(() => import('@/features/Settings/illnesses/IllnessesSettings'));
const GenesSettings = lazy(() => import('@/features/Settings/genes/GenesSettings'));
const RecommendationsSettings = lazy(
    () => import('@/features/Settings/recommendations/RecommendationsSettings')
);
const StaffSettings = lazy(() => import('@/features/Settings/staff/StaffSettings'));

export default function Settings() {
    return (
        <Suspense>
            <Routes>
                <Route element={<Redirect to="/genes" />} path="/" />
                <Route element={<StaffSettings />} path="/staff" />
                <Route element={<DiagnosesSettings />} path="/diagnoses" />
                <Route element={<RecommendationsSettings />} path="/recommendations" />
                <Route element={<TestMethodsSettings />} path="/test-methods" />
                <Route element={<MutationsSettings />} path="/mutations" />
                <Route element={<GenesSettings />} path="/genes" />
                <Route element={<IllnessesSettings />} path="/illnesses" />
            </Routes>
        </Suspense>
    );
}
