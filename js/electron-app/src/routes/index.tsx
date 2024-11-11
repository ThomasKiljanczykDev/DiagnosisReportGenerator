import { Navigate, createFileRoute, useLocation } from '@tanstack/react-router';

function Index() {
    const location = useLocation();
    return <Navigate from={location.pathname} to="/reports/patients" />;
}

export const Route = createFileRoute('/')({
    component: Index
});
