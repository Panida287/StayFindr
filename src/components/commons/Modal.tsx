import { ReactNode, useEffect } from "react";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	title?: ReactNode;
	footer?: ReactNode;
	children: ReactNode;
};

export default function Modal({
	                              isOpen,
	                              onClose,
	                              title,
	                              footer,
	                              children,
                              }: ModalProps) {
	useEffect(() => {
		// 1) lock body scroll
		document.body.style.overflow = isOpen ? "hidden" : "";

		// 2) swallow wheel & touchmove at capture phase
		const block = (e: Event) => {
			e.preventDefault();
			e.stopPropagation();
		};
		if (isOpen) {
			window.addEventListener("wheel", block, { passive: false, capture: true });
			window.addEventListener("touchmove", block, { passive: false, capture: true });
		}
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("wheel", block, { capture: true });
			window.removeEventListener("touchmove", block, { capture: true });
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
				onClick={e => e.stopPropagation()}
			>
				{/* Close */}
				<button
					onClick={onClose}
					className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
					aria-label="Close modal"
				>&times;</button>

				{/* Header */}
				{title && (
					<div className="mb-4 border-b pb-2 text-center">
						{typeof title === "string" ? (
							<h2 className="text-xl font-semibold">{title}</h2>
						) : (
							title
						)}
					</div>
				)}

				{/* Body */}
				<div className="mb-4">{children}</div>

				{/* Footer */}
				{footer && <div className="flex justify-end gap-2">{footer}</div>}
			</div>
		</div>
	);
}
