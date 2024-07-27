import { memo, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

interface RedirectProps {
    to: string;
}

const Redirect = memo(function Redirect(props: RedirectProps) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(props.to);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
});

export default Redirect;
