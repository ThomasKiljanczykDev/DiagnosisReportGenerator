import { Navigate, createFileRoute, useLocation } from '@tanstack/react-router';

function Index() {
    const location = useLocation();
    return <Navigate from={location.pathname} to="/settings/staff" />;
}

export const Route = createFileRoute('/settings/')({
    component: Index
});
