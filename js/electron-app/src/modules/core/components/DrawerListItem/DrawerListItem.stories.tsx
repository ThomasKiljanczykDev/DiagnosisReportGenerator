import React from 'react';

import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import type { Meta, StoryObj } from '@storybook/react';

import { drawerWidth } from '@/modules/core/components/AppDrawer';
import { withSbTanstackRouter } from '@/modules/core/lib/storybook';

import DrawerListItem from './index';

const meta = {
    title: 'Core/DrawerListItem',
    component: DrawerListItem,
    decorators: [
        (Story, context) => (
            <div
                style={{
                    width: drawerWidth
                }}
            >
                {withSbTanstackRouter(Story, context)}
            </div>
        )
    ],
    tags: ['autodocs'],
    args: {
        icon: <ArticleRoundedIcon />,
        navigateTo: '/',
        text: 'text'
    },
    argTypes: {
        icon: {
            control: {
                disable: true
            }
        },
        navigateTo: {
            control: {
                disable: true
            }
        }
    }
} satisfies Meta<typeof DrawerListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    name: 'Default',
    args: {
        navigateTo: '/reports/patients'
    }
};

export const Active: Story = {
    name: 'Active',
    args: {
        navigateTo: '/'
    }
};
