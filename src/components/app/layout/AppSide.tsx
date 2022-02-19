interface IProps {
    right: boolean;
}

const AppSide: React.FC<IProps> = ({ right }) => (
    <div style={{ gridArea: right ? "main-right" : "main-left" }}></div>
);

export default AppSide;
