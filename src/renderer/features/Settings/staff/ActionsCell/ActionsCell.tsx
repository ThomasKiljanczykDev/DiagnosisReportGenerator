import { useCallback } from 'react';

import { StaffMember } from '@/common/redux/slices/settings/staff';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { IconButton, Tooltip } from '@mui/material';

interface ActionsCellProps {
    onAdd: (staffMember: StaffMember) => void;
    onRemove: (id: string) => void;
    staffMember: StaffMember;
}

export default function ActionsCell(props: ActionsCellProps) {
    const handleAdd = useCallback(() => {
        props.onAdd(props.staffMember);
    }, [props.onAdd, props.staffMember]);

    const handleRemove = useCallback(() => {
        props.onRemove(props.staffMember.id);
    }, [props.onRemove, props.staffMember.id]);

    const isNewRow = !props.staffMember.id;
    return isNewRow ? (
        <Tooltip title="Dodaj" arrow={true}>
            <IconButton onClick={handleAdd}>
                <AddRoundedIcon />
            </IconButton>
        </Tooltip>
    ) : (
        <Tooltip title="Usuń" arrow={true}>
            <IconButton onClick={handleRemove}>
                <RemoveRoundedIcon />
            </IconButton>
        </Tooltip>
    );
}
