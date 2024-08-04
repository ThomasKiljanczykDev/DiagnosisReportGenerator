import { useEffect } from 'react';

import { useNavigate } from '@/router';

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/reports');
    }, [navigate]);

    return null;
}
