import type { PropsWithChildren } from 'react';

import { Button, Grid2, ThemeProvider, useTheme } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

import '@/App.css';
import { withSbTanstackRouter } from '@/modules/core/lib/storybook';
import { theme } from '@/theme';

import AppPageContent from './index';

function Container(props: PropsWithChildren) {
    const containerTheme = useTheme();
    return (
        <div
            style={{
                backgroundColor: containerTheme.palette.background.default,
                color: containerTheme.palette.text.primary,
                padding: '32px',
                transition: 'background-color 0.3s'
            }}
        >
            {props.children}
        </div>
    );
}

const meta = {
    title: 'Core/AppPageContent',
    component: AppPageContent,
    decorators: [
        (Story, context) => (
            <ThemeProvider theme={theme}>
                <Container>{withSbTanstackRouter(Story, context, '/reports/patients')}</Container>
            </ThemeProvider>
        )
    ],
    tags: ['autodocs'],
    args: {
        title: 'Title',
        actionButtons: (
            <Grid2 container spacing={2}>
                <Button component="label" role="none" variant="contained">
                    Button 1
                </Button>
                <Button component="label" role="none" variant="contained">
                    Button 2
                </Button>
            </Grid2>
        ),
        children: <p>Content</p>
    },
    argTypes: {
        actionButtons: {
            control: {
                disable: true
            }
        }
    }
} satisfies Meta<typeof AppPageContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AppPageContentStory: Story = {
    name: 'Default',
    args: {}
};
