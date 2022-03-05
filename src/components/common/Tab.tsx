import React from "react";

interface IProps {
    isActive: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Tab: React.FC<IProps> = ({ children, isActive, onClick }) => {
    return (
        <button
            className={
                isActive
                    ? "rounded bg-light-dark px-3 py-1 text-white"
                    : " px-3 py-1 text-gray-300 "
            }
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Tab;
