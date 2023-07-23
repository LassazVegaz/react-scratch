import useState from "./library/hooks/useState";

const Heading = () => {
	return <h1 className="heading">Hello World!</h1>;
};

export const App = () => {
	const [num, setNum] = useState(0);

	const h = () => {
		alert("Hello World!");
	};

	return (
		<div>
			<Heading />
			<span>Coming from react built from scratch</span>
			<br />
			<br />
			<button onClick={h}>Increase {num}</button>
		</div>
	);
};
