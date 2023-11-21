import { useEffect } from "react";
import Hero from "../../components/Hero";
import FeatureItem from "../../components/FeatureItem";

const features = [
	{
		icon: "chat",
		title: "You are our #1 priority",
		description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
	},
	{
		icon: "money",
		title: "More savings means higher rates",
		description: "The more you save with us, the higher your interest rate will be!",
	},
	{
		icon: "security",
		title: "Security you can trust",
		description: "We use top of the line encryption to make sure your data and money is always safe.",
	},
];

const Home = () => {
	useEffect(() => {
		document.title = "Argent Bank - Home Page";
	}, []);

	return (
		<main>
			<Hero>
				<h2 className="sr-only">Promoted Content</h2>
				<p className="subtitle">No fees.</p>
				<p className="subtitle">No minimum deposit.</p>
				<p className="subtitle">High interest rates.</p>
				<p className="text">Open a savings account with Argent Bank today!</p>
			</Hero>

			<section className="features">
				<h2 className="sr-only">Features</h2>
				{features.map((feature) => (
					<FeatureItem key={feature.icon} icon={feature.icon} title={feature.title} description={feature.description} />
				))}
			</section>
		</main>
	);
};

export default Home;
