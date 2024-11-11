import type { PropsWithChildren } from 'react';

import { ThemeProvider, useTheme } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

import { theme } from '@/theme';

import DarkModeToggle from './index';

function Container(props: PropsWithChildren) {
    const containerTheme = useTheme();
    return (
        <div
            style={{
                backgroundColor: containerTheme.palette.background.default,
                color: containerTheme.palette.text.primary,
                width: 'fit-content',
                padding: '32px',
                transition: 'background-color 0.3s'
            }}
        >
            {props.children}
        </div>
    );
}

const meta = {
    title: 'Core/DarkModeToggle',
    component: DarkModeToggle,
    decorators: [
        (Story) => (
            <ThemeProvider theme={theme}>
                <Container>
                    <Story />
                </Container>
            </ThemeProvider>
        )
    ]
} satisfies Meta<typeof DarkModeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DarkModeToggleStory: Story = {
    name: 'Default',
    args: {}
};
