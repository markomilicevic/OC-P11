import './Hero.css';

const Hero = ({ children }) => (
	<div className="hero">
		<section className="hero-content">{children}</section>
	</div>
);

export default Hero;
