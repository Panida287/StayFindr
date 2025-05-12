type Props = {
	currentPage: number;
	pageCount: number;
	onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, pageCount, onPageChange }: Props) {
	if (pageCount <= 1) return null;

	const renderPageNumbers = () => {
		const pages: number[] = [];

		if (pageCount <= 5) {
			for (let i = 1; i <= pageCount; i++) pages.push(i);
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4);
			} else if (currentPage >= pageCount - 2) {
				pages.push(pageCount - 3, pageCount - 2, pageCount - 1, pageCount);
			} else {
				pages.push(currentPage - 1, currentPage, currentPage + 1);
			}
		}

		const hasLeftEllipsis = pages[0] > 2;
		const hasRightEllipsis = pages[pages.length - 1] < pageCount - 1;

		return (
			<>
				{pages[0] > 1 && (
					<>
						<button
							onClick={() => onPageChange(1)}
							className="px-3 py-1 rounded text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
						>
							1
						</button>
						{hasLeftEllipsis && <span className="px-2">...</span>}
					</>
				)}

				{pages.map((p) => (
					<button
						key={p}
						onClick={() => onPageChange(p)}
						className={`px-3 py-1 rounded text-sm ${
							p === currentPage
								? 'bg-pink-600 text-white'
								: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
						}`}
					>
						{p}
					</button>
				))}

				{hasRightEllipsis && (
					<>
						<span className="px-2">...</span>
						<button
							onClick={() => onPageChange(pageCount)}
							className="px-3 py-1 rounded text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
						>
							{pageCount}
						</button>
					</>
				)}
			</>
		);
	};

	return (
		<div className="flex justify-center items-center gap-1 mt-6 flex-wrap">
			<button
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
				className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
			>
				First page
			</button>
			<button
				onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
			>
				&lt;
			</button>

			{renderPageNumbers()}

			<button
				onClick={() => currentPage < pageCount && onPageChange(currentPage + 1)}
				disabled={currentPage === pageCount}
				className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
			>
				&gt;
			</button>
			<button
				onClick={() => onPageChange(pageCount)}
				disabled={currentPage === pageCount}
				className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
			>
				Last page
			</button>
		</div>
	);
}
