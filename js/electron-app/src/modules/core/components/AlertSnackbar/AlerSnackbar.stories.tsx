import type { Meta, StoryObj } from '@storybook/react';

import AlertSnackbar from './index';

const meta: Meta<typeof AlertSnackbar> = {
    title: 'Core/AlertSnackbar',
    component: AlertSnackbar,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            options: ['default', 'success', 'error', 'warning', 'info'],
            control: {
                type: 'select'
            }
        }
    },
    args: {
        message: 'This is a message'
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        variant: 'default'
    }
};

export const Success: Story = {
    args: {
        variant: 'success'
    }
};

export const Error: Story = {
    args: {
        variant: 'error'
    }
};

export const Warning: Story = {
    args: {
        variant: 'warning'
    }
};

export const Info: Story = {
    args: {
        variant: 'info'
    }
};
