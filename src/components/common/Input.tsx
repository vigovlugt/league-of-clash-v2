interface IProps {
    placeholder?: string;
    value: string;
    onChange: (x: string) => void;
}

const Input: React.FC<IProps> = ({ placeholder }) => (
    <input
        className="mt-4 w-full rounded-md bg-dark p-3 text-white placeholder-white placeholder-opacity-30 focus:outline-none"
        placeholder={placeholder}
    />
);

export default Input;
