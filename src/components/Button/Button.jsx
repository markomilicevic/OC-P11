import "./Button.css";

const Button = ({ isLarge = false, onClick, children }) => (
	<button
		onClick={() => {
			onClick();
		}}
		className={isLarge ? "large-button" : "button"}
	>
		{children}
	</button>
);

export default Button;
