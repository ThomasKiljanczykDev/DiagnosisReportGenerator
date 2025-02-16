import {
    Navigate,
    type RegisteredRouter,
    type RoutePaths,
    createLazyFileRoute,
    useLocation
} from '@tanstack/react-router';

function Index() {
    const pathname = useLocation({
        select: (location) => location.pathname
    }) as RoutePaths<RegisteredRouter['routeTree']>;

    return <Navigate from={pathname} to="/reports/patients" />;
}

export const Route = createLazyFileRoute('/')({
    component: Index
});
