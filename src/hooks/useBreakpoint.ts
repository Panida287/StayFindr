import { useEffect, useState } from 'react';

export default function useBreakpoint(breakpoint = 0) {
	const [matches, setMatches] = useState(() => window.innerWidth <= breakpoint);

	useEffect(() => {
		const handleResize = () => {
			setMatches(window.innerWidth <= breakpoint);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [breakpoint]);

	return matches;
}
