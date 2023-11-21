import "./Button.css";

const Button = ({ isLarge = false, onClick, children }) => (
	<button
		onClick={(event) => {
			onClick(event);
		}}
		className={isLarge ? "large-button" : "button"}
	>
		{children}
	</button>
);

export default Button;
