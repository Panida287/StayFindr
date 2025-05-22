type Props = {
	currentPage: number;
	pageCount: number;
	onPageChange: (page: number) => void;
};

export default function Pagination({
	                                   currentPage,
	                                   pageCount,
	                                   onPageChange,
                                   }: Props) {
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
			<div className="flex items-center space-x-1">
				{/* First page / ellipsis */}
				{pages[0] > 1 && (
					<>
						<button
							onClick={() => onPageChange(1)}
							className="px-3 py-1 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
						>
							1
						</button>
						{hasLeftEllipsis && (
							<span className="px-2 text-gray-500 select-none">…</span>
						)}
					</>
				)}

				{/* Middle pages */}
				{pages.map((p) => (
					<button
						key={p}
						onClick={() => onPageChange(p)}
						className={`px-3 py-1 rounded-full text-sm font-medium ${
							p === currentPage
								? "bg-primary text-white"
								: "border border-gray-300 bg-white text-gray-700 hover:bg-background"
						}`}
					>
						{p}
					</button>
				))}

				{/* Ellipsis / last page */}
				{hasRightEllipsis && (
					<>
						<span className="px-2 text-gray-500 select-none">…</span>
						<button
							onClick={() => onPageChange(pageCount)}
							className="px-3 py-1 rounded-full text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-background"
						>
							{pageCount}
						</button>
					</>
				)}
			</div>
		);
	};

	return (
		<div className="flex flex-wrap justify-center items-center space-x-2 mt-6">
			<button
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
				className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-background disabled:opacity-50"
			>
				First
			</button>
			<button
				onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-background disabled:opacity-50"
			>
				Previous
			</button>

			{renderPageNumbers()}

			<button
				onClick={() =>
					currentPage < pageCount && onPageChange(currentPage + 1)
				}
				disabled={currentPage === pageCount}
				className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-background disabled:opacity-50"
			>
				Next
			</button>
			<button
				onClick={() => onPageChange(pageCount)}
				disabled={currentPage === pageCount}
				className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-background disabled:opacity-50"
			>
				Last
			</button>
		</div>
	);
}
