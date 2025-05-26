import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FALLBACK } from '../../constants';

export type GalleryImage = {
	url: string;
	alt?: string;
};

interface Props {
	images: GalleryImage[];
	altFallback?: string;
	heightClass?: string;
}

export default function ImageGalleryAlternative({
	                                                images,
	                                                altFallback = 'Gallery image',
	                                                heightClass = 'h-80',
                                                }: Props) {
	const [current, setCurrent] = useState(0);
	const total = images.length;

	const prev = () => setCurrent((c) => (c - 1 + total) % total);
	const next = () => setCurrent((c) => (c + 1) % total);

	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = FALLBACK.venue;
	};

	return (
		<div className="w-full">
			<div className="relative rounded-lg overflow-hidden">
				{/* Main image */}
				<img
					src={images[current].url}
					alt={images[current].alt || altFallback}
					onError={handleError}
					className={`w-full object-cover ${heightClass}`}
				/>

				{/* Prev/Next buttons */}
				<button
					onClick={prev}
					className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 p-2 rounded-full hover:bg-opacity-80"
				>
					<ChevronLeft className="w-5 h-5 text-gray-800" />
				</button>
				<button
					onClick={next}
					className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 p-2 rounded-full hover:bg-opacity-80"
				>
					<ChevronRight className="w-5 h-5 text-gray-800" />
				</button>

				{/* Slide counter */}
				<div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
					{current + 1} / {total}
				</div>
			</div>

			{/* Thumbnails */}
			<div className="mt-2 flex gap-2 overflow-x-auto">
				{images.map((img, idx) => (
					<button
						key={idx}
						onClick={() => setCurrent(idx)}
						className={`flex-shrink-0 rounded-md overflow-hidden border-2 ${
							idx === current ? 'border-green-700' : 'border-transparent'
						}`}
					>
						<img
							src={img.url}
							alt={img.alt || altFallback}
							onError={handleError}
							className="w-20 h-12 object-cover"
						/>
					</button>
				))}
			</div>
		</div>
	);
}
