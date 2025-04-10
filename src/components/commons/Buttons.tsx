interface ButtonProps {
	text: string;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'success';
}

export function Button({
	                       text,
	                       onClick,
	                       type = 'button',
	                       variant = 'primary',
                       }: ButtonProps) {
	const baseStyle = 'px-4 py-2 rounded-full text-white font-bold transition-all';

	const variantStyles = {
		primary: 'bg-primary hover:bg-pink-800',
		secondary: 'bg-secondary hover:bg-orange-600',
		accent: 'bg-accent hover:bg-blue-800',
		danger: 'bg-error hover:bg-red-700',
		success: 'bg-success hover:bg-green-700',
	};

	return (
		<button
			type={type}
			onClick={onClick}
			className={`${baseStyle} ${variantStyles[variant]}`}
		>
			{text}
		</button>
	);
}
