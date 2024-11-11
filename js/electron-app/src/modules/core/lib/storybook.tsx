import type { PartialStoryFn, StoryContext } from 'storybook/internal/types';

import type { ReactRenderer } from '@storybook/react';
import {
    type RoutePaths,
    RouterProvider,
    createMemoryHistory,
    createRootRoute,
    createRoute,
    createRouter
} from '@tanstack/react-router';

const rootRoute = createRootRoute();
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/' });
const subRoute = createRoute({ getParentRoute: () => rootRoute, path: '/reports/patients' });
const routeTree = rootRoute.addChildren([indexRoute, subRoute]);

export function withSbTanstackRouter(
    Story: PartialStoryFn<ReactRenderer, object>,
    context: StoryContext<ReactRenderer, object>,
    targetRoute: RoutePaths<typeof routeTree> | undefined = undefined
) {
    const startingRoute = targetRoute ?? '/';

    const memoryHistory = createMemoryHistory({ initialEntries: [startingRoute] });
    const router = createRouter({ routeTree, history: memoryHistory });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return <RouterProvider router={router} defaultComponent={() => <Story {...context} />} />;
}
