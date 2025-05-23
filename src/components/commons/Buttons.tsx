import React from 'react';

export interface CommonButtonProps {
	onClick?: () => void;
	className?: string;
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	bgColor?: string;
	textColor?: string;
	hoverColor?: string;
	fullWidth?: boolean;
	borderClass?: string;
	hoverTextColor?: string;
}

export function CommonButton({
	                             onClick,
	                             className = '',
	                             children,
	                             type = 'button',
	                             disabled = false,
	                             bgColor = 'bg-primary',
	                             textColor = 'text-white',
	                             hoverColor = 'hover:bg-primary-dark',
	                             hoverTextColor = 'hover:text-primary',
	                             fullWidth = false,
	                             borderClass = '',
                             }: CommonButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`
        ${bgColor} ${textColor} ${hoverColor}
        px-6 py-2 rounded-full text-sm transition
        ${fullWidth ? 'w-full' : ''}
        ${borderClass}
        ${hoverColor}
        ${hoverTextColor}
        ${className}
       
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
		>
			{children}
		</button>
	);
}


type SplitButtonProps = {
	text: string;
	onClick?: () => void;
	textColor?: string;
	hoverTextColor?: string; // Tailwind class name, e.g., group-hover:text-yellow-500
	arrowColor?: string;
	arrowHoverColor?: string; // Tailwind class name, e.g., group-hover:text-white
	bgColor?: string;
	borderColor?: string;
	className?: string;
};

/** Fancy split-style animated CTA button */
export function SplitButton({
	                            text,
	                            onClick,
	                            textColor = 'text-primary',
	                            hoverTextColor = 'group-hover:text-primary',
	                            arrowColor = 'text-[#A97C50]',
	                            arrowHoverColor = 'group-hover:text-primary',
	                            bgColor = 'bg-secondary',
	                            borderColor = 'border-[#A97C50]',
	                            className = '',
                            }: SplitButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`
				relative group overflow-hidden inline-flex items-center rounded-full 
				border ${borderColor} border-r-0
				${bgColor} text-md font-bold flex-shrink-0 ${className}
			`}
		>
			{/* Expanding highlight */}
			<span
				className="absolute top-[1px] bottom-[1px] left-[1px] z-0 bg-white w-[80%] group-hover:w-[calc(100%-3px)] transition-all duration-500 ease-in-out rounded-full"
			/>
			{/* Text and arrow */}
			<span className="relative z-10 flex items-center whitespace-nowrap">
				<span className={`px-6 py-1 transition-colors duration-500 ${textColor} ${hoverTextColor}`}>
					{text}
				</span>
				<span
					className={`pr-[10px] transition-colors duration-500 ${arrowColor} ${arrowHoverColor}`}
				>
					›
				</span>
			</span>
		</button>
	);
}
