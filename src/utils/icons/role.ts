import React from "react";
import BottomIcon from "../../components/icons/roles/BottomIcon";
import JungleIcon from "../../components/icons/roles/JungleIcon";
import MidIcon from "../../components/icons/roles/MidIcon";
import SupportIcon from "../../components/icons/roles/SupportIcon";
import TopIcon from "../../components/icons/roles/TopIcon";
import Role from "../../models/Role";

interface IRoleProps {
    className: string;
}

export function iconByRole(role: Role): React.FC<IRoleProps> {
    const result = {
        [Role.Adc]: BottomIcon,
        [Role.Jungle]: JungleIcon,
        [Role.Mid]: MidIcon,
        [Role.Supp]: SupportIcon,
        [Role.Top]: TopIcon,
        6: undefined,
    }[role];

    if (!result) {
        throw new Error(`No icon for role ${role}`);
    }

    return result;
}
