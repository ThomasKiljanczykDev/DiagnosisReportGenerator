import { DetailedHTMLProps, InputHTMLAttributes, memo } from 'react';

const VisuallyHiddenInput = memo(function VisuallyHiddenInput(
    props: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
) {
    return (
        <input
            {...props}
            style={{
                clipPath: 'inset(50%)',
                height: 1,
                overflow: 'hidden',
                position: 'absolute',
                bottom: 0,
                left: 0,
                whiteSpace: 'nowrap',
                width: 1
            }}
        />
    );
});

export default VisuallyHiddenInput;
