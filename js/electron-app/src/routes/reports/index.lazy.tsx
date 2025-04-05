import { Navigate, createLazyFileRoute } from '@tanstack/react-router';

function Index() {
    return <Navigate to="/reports/patients" />;
}

export const Route = createLazyFileRoute('/reports/')({
    component: Index
});
