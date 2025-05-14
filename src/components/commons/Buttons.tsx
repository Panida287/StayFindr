type CommonButtonProps = {
	onClick?: () => void;
	className?: string;
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
};

/** Common utility button with color control */
export function CommonButton({
	                             onClick,
	                             className = '',
	                             children,
	                             type = 'button',
	                             disabled = false,
                             }: CommonButtonProps & {
	bgColor?: string;
	textColor?: string;
	hoverColor?: string;
	fullWidth?: boolean;
}) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`
				px-6 py-2 rounded-full text-sm transition 
				${className}
				${disabled ? 'opacity-50 cursor-not-allowed' : ''}
			`}
		>
			{children}
		</button>
	);
}

/** Fancy split-style animated CTA button */
export function SplitButton({
	                            text,
	                            onClick,
	                            textColor = 'text-primary',
	                            arrowColor = 'text-[#A97C50]',
	                            arrowHoverColor = 'text-primary',
	                            bgColor = 'bg-secondary',
	                            borderColor = 'border-[#A97C50]',
	                            className = '',
                            }: {
	text: string;
	onClick?: () => void;
	textColor?: string;
	arrowColor?: string;
	arrowHoverColor?: string;
	bgColor?: string;
	borderColor?: string;
	className?: string;
}) {
	return (
		<button
			onClick={onClick}
			className={`
			relative group overflow-hidden inline-flex items-center rounded-full 
			border border-t ${borderColor} border-b ${borderColor} border-l ${borderColor} border-r-0 
			${bgColor} text-md font-bold flex-shrink-0 ${className}
			`}
		>
			{/* Animated expanding background */}
			<span
				className="absolute top-[1px] bottom-[1px] left-[1px] z-0 bg-white w-[80%] group-hover:w-[calc(100%-3px)] transition-all duration-500 ease-in-out rounded-full" />

			{/* Foreground text and arrow */}
			<span className="relative z-10 flex items-center whitespace-nowrap">
				<span className={`px-6 py-1 ${textColor} transition-colors duration-500 group-hover:text-primary`}>
					{text}
				</span>
				<span
					className={`
						pr-[10px]
						${arrowColor} 
						transition-colors duration-500 
						group-hover:${arrowHoverColor}
					`}
				>
					›
				</span>
			</span>
		</button>
	);
}
