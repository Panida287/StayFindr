import { CommonButton } from './Buttons';

type Props = {
	/** Currently active page */
	currentPage: number;
	/** Total number of pages available */
	pageCount: number;
	/** Callback to change the page */
	onPageChange: (page: number) => void;
};

/**
 * Pagination component with responsive design.
 * Displays mobile-friendly buttons and full desktop controls.
 *
 * @component
 * @param {number} currentPage - The currently active page
 * @param {number} pageCount - Total number of pages
 * @param {Function} onPageChange - Function to update the current page
 */
export default function Pagination({ currentPage, pageCount, onPageChange }: Props) {
	if (pageCount <= 1) return null;

	const goFirst = () => onPageChange(1);
	const goPrev = () => onPageChange(currentPage - 1);
	const goNext = () => onPageChange(currentPage + 1);
	const goLast = () => onPageChange(pageCount);

	const getPages = () => {
		if (pageCount <= 3) return Array.from({ length: pageCount }, (_, i) => i + 1);
		if (currentPage === 1) return [1, 2, 3];
		if (currentPage === pageCount) return [pageCount - 2, pageCount - 1, pageCount];
		return [currentPage - 1, currentPage, currentPage + 1];
	};

	const pages = getPages();

	return (
		<nav className="mt-6" role="navigation" aria-label="Pagination navigation">
			{/* Mobile View */}
			<div className="flex items-center justify-center space-x-2 md:hidden">
				<CommonButton
					onClick={goFirst}
					disabled={currentPage === 1}
					bgColor="bg-white"
					hoverColor="hover:bg-background"
					textColor="text-primary"
					className="p-2 rounded-full border border-gray-300 disabled:opacity-50"
					aria-label="Go to first page"
				>
					{'<<'}
				</CommonButton>
				<CommonButton
					onClick={goPrev}
					disabled={currentPage === 1}
					bgColor="bg-white"
					hoverColor="hover:bg-background"
					textColor="text-primary"
					className="p-2 rounded-full border border-gray-300 disabled:opacity-50"
					aria-label="Go to previous page"
				>
					{'<'}
				</CommonButton>
				<span
					className="text-xs font-medium text-primary"
					aria-live="polite"
					aria-atomic="true"
				>
					{currentPage}/{pageCount}
				</span>
				<CommonButton
					onClick={goNext}
					disabled={currentPage === pageCount}
					bgColor="bg-white"
					hoverColor="hover:bg-background"
					textColor="text-primary"
					className="p-2 rounded-full border border-gray-300 disabled:opacity-50"
					aria-label="Go to next page"
				>
					{'>'}
				</CommonButton>
				<CommonButton
					onClick={goLast}
					disabled={currentPage === pageCount}
					bgColor="bg-white"
					hoverColor="hover:bg-background"
					textColor="text-primary"
					className="p-2 rounded-full border border-gray-300 disabled:opacity-50"
					aria-label="Go to last page"
				>
					{'>>'}
				</CommonButton>
			</div>

			{/* Desktop View */}
			<div className="hidden md:flex flex-wrap justify-center items-center gap-2">
				<CommonButton
					onClick={goFirst}
					disabled={currentPage === 1}
					bgColor="bg-white"
					hoverColor="hover:bg-background"
					textColor="text-primary"
					className="px-2 py-2 rounded-full text-xs border border-gray-300 disabled:opacity-50"
					aria-label="Go to first page"
				>
					First
				</CommonButton>
				<CommonButton
					onClick={goPrev}
					disabled={currentPage === 1}
					bgColor="bg-white"
					hoverColor="hover:bg-background"
					textColor="text-primary"
					className="px-2 py-2 rounded-full text-xs border border-gray-300 disabled:opacity-50"
					aria-label="Go to previous page"
				>
					Previous
				</CommonButton>

				{pages.map((page) => {
					const isActive = page === currentPage;
					return (
						<CommonButton
							key={page}
							onClick={() => onPageChange(page)}
							bgColor={isActive ? 'bg-primary' : 'bg-white'}
							hoverColor={isActive ? undefined : 'hover:bg-background'}
							textColor={isActive ? 'text-white' : 'text-primary'}
							className="px-[13px] py-1 rounded-full text-xs font-medium border border-gray-300"
							aria-current={isActive ? 'page' : undefined}
							aria-label={`Go to page ${page}`}
						>
							{page}
						</CommonButton>
					);
				})}

				<CommonButton
					onClick={goNext}
					disabled={currentPage === pageCount}
					bgColor="bg-white"
					hoverColor="hover:bg-background"
					textColor="text-primary"
					className="px-4 py-2 rounded-full text-xs border border-gray-300 disabled:opacity-50"
					aria-label="Go to next page"
				>
					Next
				</CommonButton>
				<CommonButton
					onClick={goLast}
					disabled={currentPage === pageCount}
					bgColor="bg-white"
					hoverColor="hover:bg-background"
					textColor="text-primary"
					className="px-4 py-2 rounded-full text-xs border border-gray-300 disabled:opacity-50"
					aria-label="Go to last page"
				>
					Last
				</CommonButton>
			</div>
		</nav>
	);
}
