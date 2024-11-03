import { type ReactElement } from 'react';

import { IconButton } from '@mui/material';

interface ToggleIconProps {
    offIcon: ReactElement;
    onIcon: ReactElement;
    on: boolean;
}

export default function ToggleIcon(props: ToggleIconProps) {
    const { offIcon, onIcon, on } = props;

    return (
        <IconButton>
            <div
                style={{
                    width: 24,
                    height: 24,
                    position: 'relative',
                    display: 'inline-block'
                }}
            >
                <div
                    style={{
                        visibility: !on ? 'visible' : 'hidden',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        opacity: !on ? 1 : 0,
                        transition: 'opacity 0.3s, color 0.3s',
                        transitionDelay: !on ? '0.2s' : '0'
                    }}
                >
                    {offIcon}
                </div>
                <div
                    style={{
                        visibility: on ? 'visible' : 'hidden',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        opacity: on ? 1 : 0,
                        transition: 'opacity 0.3s, color 0.3s',
                        transitionDelay: on ? '0.2s' : '0'
                    }}
                >
                    {onIcon}
                </div>
            </div>
        </IconButton>
    );
}
