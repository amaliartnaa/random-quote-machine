import { useState, useEffect } from 'react';

export default function App() {
	const [quote, setQuote] = useState('');
	const [author, setAuthor] = useState('');
	const [bgColor, setBgColor] = useState('bg-yellow-100');

	const colors = [
		'bg-red-100',
		'bg-orange-100',
		'bg-yellow-100',
		'bg-green-100',
		'bg-blue-100',
		'bg-indigo-100',
		'bg-purple-100',
	];

	const fetchQuote = () => {
		fetch('https://api.quotable.io/random')
			.then(response => response.json())
			.then(data => {
				setQuote(data.content);
				setAuthor(data.author);
				changeBgColor();
			})
			.catch(error => console.error('Error fetching quote:', error));
	};

	const changeBgColor = () => {
		const randomIndex = Math.floor(Math.random() * colors.length);
		setBgColor(colors[randomIndex]);
	};

	useEffect(() => {
		fetchQuote();
	}, []);

	const tweetQuote = () => {
		const tweetUrl = `https://twitter.com/intent/tweet?text="${quote}" - ${author}`;
		window.open(tweetUrl, '_blank');
	};

	return (
		<>
      <h1 className="font-bold text-center mt-20 text-6xl">Quotes for You 🪼</h1>
			<div id="quote-box" className={`w-4/5 mx-auto text-center mt-20 mb-28 p-8 rounded-xl ${bgColor}`}>
				<div id="text" className="text-2xl mb-4">
					&quot;{quote}&quot;
				</div>
				<div id="author" className="mb-24 font-semibold">
					- {author}
				</div>
				<button
					id="new-quote"
					className="px-4 py-2 mr-2 bg-white text-black rounded hover:bg-slate-400"
					onClick={fetchQuote}
				>
					New Quote
				</button>
				<a
					id="tweet-quote"
					className="px-4 py-2 bg-black text-white rounded hover:bg-slate-400"
					href={`https://twitter.com/intent/tweet?text="${quote}" - ${author}`}
					target="_blank"
					rel="noopener noreferrer"
					onClick={tweetQuote}
				>
					Tweet Quote
				</a>
			</div>
		</>
	);
}
