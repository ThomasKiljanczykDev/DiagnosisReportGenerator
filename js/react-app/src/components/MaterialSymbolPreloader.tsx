import React, { memo, useEffect } from 'react';

import { MaterialSymbol } from 'react-material-symbols';

const MaterialSymbolPreloader = memo(function MaterialSymbolPreloader() {
    const [endPreload, setEndPreload] = React.useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setEndPreload(true);
        }, 50);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div
            style={{
                display: endPreload ? 'none' : 'hidden'
            }}
        >
            <MaterialSymbol icon="check" />
        </div>
    );
});

export default MaterialSymbolPreloader;
