import useState from "./library/hooks/useState";

const Heading = () => {
	return <h1 className="heading">Hello World!</h1>;
};

export const App = () => {
	const [num, setNum] = useState(0);

	return (
		<div className="container">
			<Heading />
			<div>Coming from react built from scratch</div>
			<div className="buttons-container">
				<button onClick={() => setNum(num + 1)}>Increase {num}</button>
			</div>
		</div>
	);
};
