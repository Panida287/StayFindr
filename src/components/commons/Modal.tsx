import { ReactNode } from "react";

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
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
					aria-label="Close modal"
				>
					&times;
				</button>

				{/* Optional header */}
				{title && (
					<div className="mb-4 border-b pb-2 flex w-full text-center items-center justify-center">
						{typeof title === "string" ? (
							<h2 className="text-xl font-semibold">{title}</h2>
						) : (
							title
						)}
					</div>
				)}

				{/* Body */}
				<div className="mb-4 flex justify-center w-full">{children}</div>

				{/* Optional footer */}
				{footer && <div className="flex justify-end gap-2">{footer}</div>}
			</div>
		</div>
	);
}
