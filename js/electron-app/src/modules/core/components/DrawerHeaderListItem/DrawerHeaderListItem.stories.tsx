import type { Meta, StoryObj } from '@storybook/react';

import { drawerWidth } from '@/modules/core/components/AppDrawer';

import DrawerHeaderListItem from './index';

const meta = {
    title: 'Core/DrawerHeaderListItem',
    component: DrawerHeaderListItem,
    decorators: [
        (Story) => (
            <div style={{ backgroundColor: 'whitesmoke', padding: '8px' }}>
                <div style={{ width: drawerWidth, backgroundColor: 'white' }}>
                    <Story />
                </div>
            </div>
        )
    ],
    tags: ['autodocs'],
    args: {
        text: 'text'
    }
} satisfies Meta<typeof DrawerHeaderListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DrawerHeaderListItemStory: Story = {
    name: 'Default',
    args: {}
};
