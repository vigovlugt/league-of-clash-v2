enum Role {
    Jungle = 1,
    Supp = 2,
    Adc = 3,
    Top = 4,
    Mid = 5,
    None = 6,
}
export default Role;

export function roleToString(role: Role): string | undefined {
    return {
        [Role.Jungle]: "Jungle",
        [Role.Supp]: "Support",
        [Role.Adc]: "Adc",
        [Role.Top]: "Top",
        [Role.Mid]: "Mid",
        [Role.None]: "None",
    }[role];
}

export function fromRoleString(role: string): Role {
    const result = {
        jungle: Role.Jungle,
        supp: Role.Supp,
        adc: Role.Adc,
        top: Role.Top,
        mid: Role.Mid,
        none: Role.None,
    }[role];

    if (!result) {
        throw new Error(`Role ${role} not found`);
    }

    return result;
}
