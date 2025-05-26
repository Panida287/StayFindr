import { ReactNode, useEffect } from "react";

type ModalProps = {
	/** Controls whether the modal is open */
	isOpen: boolean;
	/** Function to close the modal */
	onClose: () => void;
	/** Optional title content for the modal header */
	title?: ReactNode;
	/** Optional footer content (usually buttons) */
	footer?: ReactNode;
	/** Modal body content */
	children: ReactNode;
};

/**
 * A reusable, accessible modal dialog component with scroll lock and focus trap.
 */
export default function Modal({
	                              isOpen,
	                              onClose,
	                              title,
	                              footer,
	                              children,
                              }: ModalProps) {
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";

		const blockScroll = (e: Event) => {
			e.preventDefault();
			e.stopPropagation();
		};

		if (isOpen) {
			window.addEventListener("wheel", blockScroll, { passive: false, capture: true });
			window.addEventListener("touchmove", blockScroll, { passive: false, capture: true });
		}

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("wheel", blockScroll, { capture: true });
			window.removeEventListener("touchmove", blockScroll, { capture: true });
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative animate-fadeIn"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
					aria-label="Close modal"
				>
					&times;
				</button>

				{title && (
					<div className="mb-4 border-b pb-2 text-center">
						{typeof title === "string" ? (
							<h2 id="modal-title" className="text-xl font-semibold">
								{title}
							</h2>
						) : (
							<div id="modal-title">{title}</div>
						)}
					</div>
				)}

				<div className="mb-4">{children}</div>

				{footer && <div className="flex justify-end gap-2">{footer}</div>}
			</div>
		</div>
	);
}
