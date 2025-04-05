import { Navigate, createLazyFileRoute } from '@tanstack/react-router';

function Index() {
    return <Navigate to="/settings/staff" />;
}

export const Route = createLazyFileRoute('/settings/')({
    component: Index
});
