import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

import ErrorTooltip from './index';

const meta = {
    title: 'Core/ErrorTooltip',
    component: ErrorTooltip,
    tags: ['autodocs'],
    args: {
        open: true,
        title: 'This is an error message',
        children: <Button variant="outlined">Button</Button>
    },
    argTypes: {
        children: {
            control: {
                disable: true
            }
        }
    }
} satisfies Meta<typeof ErrorTooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ErrorTooltipStory: Story = {
    name: 'Default',
    args: {}
};
