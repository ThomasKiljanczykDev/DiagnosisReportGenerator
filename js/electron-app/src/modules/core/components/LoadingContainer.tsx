import type { PropsWithChildren } from 'react';

import { Box, LinearProgress } from '@mui/material';

interface LoadingContainerProps {
    loading: boolean;
}

export default function LoadingContainer(props: PropsWithChildren<LoadingContainerProps>) {
    return props.loading ? (
        <Box display="flex" width="100%" height="100%" alignItems="center" justifyContent="center">
            <LinearProgress
                style={{
                    width: '20rem'
                }}
            />
        </Box>
    ) : (
        props.children
    );
}
