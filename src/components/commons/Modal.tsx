import { ReactNode } from "react";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
				onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
			>
				<button
					onClick={onClose}
					className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
					aria-label="Close modal"
				>
					&times;
				</button>

				{children}
			</div>
		</div>
	);
}
