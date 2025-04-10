import { Button } from './components/commons/Buttons.tsx';

function App() {
	const title = document.querySelector('title');
	if (title) {
		title.textContent = 'StayFindr';
	}
	return (
		<>
			<Button text="Homepage" variant="primary" />
			<h1>This is H1</h1>
			<p>This is paragraph</p>
		</>
	);
}

export default App;
