import { useState } from 'react';
import { FALLBACK } from '../constants.ts';

type Props = {
	/** Source URL of the image */
	src?: string;

	/** Alternative text for accessibility and SEO */
	alt?: string;

	/** Tailwind or custom class string for styling */
	className?: string;

	/** Fallback image if `src` fails or is empty */
	fallbackSrc?: string;
};

/**
 * SafeImage ensures graceful image rendering by falling back to a default image if the source fails.
 * Optimized for accessibility (alt text), SEO, and performance (lazy loading).
 */
export default function SafeImage({
	                                  src,
	                                  alt = 'Image',
	                                  className = '',
	                                  fallbackSrc = FALLBACK.venue,
                                  }: Props) {
	const [error, setError] = useState(false);

	return (
		<img
			src={error || !src ? fallbackSrc : src}
			alt={alt}
			className={className}
			loading="lazy"
			decoding="async"
			role="img"
			onError={() => setError(true)}
		/>
	);
}
