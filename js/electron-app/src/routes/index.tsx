import { Navigate, createFileRoute } from '@tanstack/react-router';

function Index() {
    return <Navigate to="/reports" params />;
}

export const Route = createFileRoute('/')({
    component: Index
});
