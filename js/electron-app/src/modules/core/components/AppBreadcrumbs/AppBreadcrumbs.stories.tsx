import type { Meta, StoryObj } from '@storybook/react';

import { withSbTanstackRouter } from '@/modules/core/lib/storybook';

import AppBreadcrumbs from './index';

const meta = {
    title: 'Core/AppBreadcrumbs',
    component: AppBreadcrumbs,
    decorators: [(Story, context) => withSbTanstackRouter(Story, context)],
    tags: ['autodocs']
} satisfies Meta<typeof AppBreadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
    name: 'Home',
    args: {}
};

export const Route: Story = {
    name: 'Route',
    decorators: [(Story, context) => withSbTanstackRouter(Story, context, '/reports/patients')],
    args: {}
};
