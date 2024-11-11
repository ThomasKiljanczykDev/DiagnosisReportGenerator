import React from 'react';

import Brightness4RoundedIcon from '@mui/icons-material/Brightness4Rounded';
import BrightnessHighRoundedIcon from '@mui/icons-material/BrightnessHighRounded';
import { useColorScheme } from '@mui/material';

import ToggleIcon from '@/modules/core/components/ToggleIcon';

export default function DarkModeToggle() {
    const { mode, setMode } = useColorScheme();

    return (
        <ToggleIcon
            on={mode === 'dark'}
            onIcon={<BrightnessHighRoundedIcon onClick={() => setMode('light')} />}
            offIcon={<Brightness4RoundedIcon onClick={() => setMode('dark')} />}
        />
    );
}
