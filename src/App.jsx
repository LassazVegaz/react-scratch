import React from "./library/react";

const Heading = () => {
	return <h1 className="heading">Hello World!</h1>;
};

export const App = () => {
	const [num1, setNum1] = React.useState(0);
	const [num2, setNum2] = React.useState(0);

	React.useEffect(() => {
		console.log("I am mounted");
	}, []);

	React.useEffect(() => {
		console.log(`num1 changed: ${num1}`);
	}, [num1]);

	React.useEffect(() => {
		console.log(`num2 changed: ${num2}`);
	}, [num2]);

	return (
		<div className="container">
			<Heading />
			<div>Coming from react built from scratch</div>
			<div className="buttons-container">
				<button onClick={() => setNum1(num1 + 1)}>
					Increase {num1}
				</button>
				<button onClick={() => setNum2(num2 + 1)}>
					Increase {num2}
				</button>
			</div>
		</div>
	);
};
