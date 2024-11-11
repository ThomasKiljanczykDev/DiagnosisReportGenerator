import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import BrightnessHighRoundedIcon from '@mui/icons-material/BrightnessHighRounded';
import type { Meta, StoryObj } from '@storybook/react';

import ToggleIcon from './index';

const meta = {
    title: 'Core/ToggleIcon',
    component: ToggleIcon,
    tags: ['autodocs'],
    args: {
        on: true,
        offIcon: <Brightness4RoundedIcon />,
        onIcon: <BrightnessHighRoundedIcon />
    },
    argTypes: {
        offIcon: {
            control: {
                disable: true
            }
        },
        onIcon: {
            control: {
                disable: true
            }
        }
    }
} satisfies Meta<typeof ToggleIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ToggleIconStory: Story = {
    name: 'Default',
    args: {}
};
