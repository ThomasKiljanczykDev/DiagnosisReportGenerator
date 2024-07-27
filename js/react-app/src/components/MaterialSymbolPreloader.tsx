import React, { memo, useEffect } from 'react';

import { MaterialSymbol, type SymbolCodepoints } from 'react-material-symbols';

interface MaterialSymbolPreloaderProps {
    icons: SymbolCodepoints[];
}

const MaterialSymbolPreloader = memo(function MaterialSymbolPreloader(
    props: MaterialSymbolPreloaderProps
) {
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
            {props.icons.map((icon, index) => (
                <MaterialSymbol key={index} icon={icon} />
            ))}
        </div>
    );
});

export default MaterialSymbolPreloader;
