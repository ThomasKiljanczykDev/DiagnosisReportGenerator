import { memo, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

interface RedirectProps {
    to: string;
}

const Redirect = memo(function Redirect(props: RedirectProps) {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(props.to);
    }, []);

    return null;
});

export default Redirect;
