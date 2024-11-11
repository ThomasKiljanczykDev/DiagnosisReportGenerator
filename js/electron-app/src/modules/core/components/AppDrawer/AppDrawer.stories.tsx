import 'react-material-symbols/rounded';

import type { Meta, StoryObj } from '@storybook/react';

import { withSbTanstackRouter } from '@/modules/core/lib/storybook';

import AppDrawer from './index';

const meta = {
    title: 'Core/AppDrawer',
    component: AppDrawer,
    decorators: [(Story, context) => withSbTanstackRouter(Story, context)]
} satisfies Meta<typeof AppDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AppDrawerStory: Story = {
    name: 'Default',
    args: {}
};
