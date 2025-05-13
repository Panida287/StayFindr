type Props = {
	text: string;
	onClick?: () => void;
	textColor?: string;      // e.g. 'text-primary'
	arrowColor?: string;     // e.g. 'text-[#A97C50]'
	bgColor?: string;        // e.g. 'bg-secondary'
	borderColor?: string;    // e.g. 'border-[#333]'
};

export default function SplitButton({
	                                    text,
	                                    onClick,
	                                    textColor = 'text-primary',
	                                    arrowColor = 'text-[#A97C50]',
	                                    bgColor = 'bg-secondary',
	                                    borderColor = 'border-[#A97C50]',
                                    }: Props) {
	return (
		<button
			onClick={onClick}
			className={`relative group overflow-hidden inline-flex items-center rounded-full border border-t ${borderColor} border-b ${borderColor} border-l ${borderColor} border-r-0 ${bgColor} text-sm font-bold`}
		>
			{/* Expanding white background */}
			<span className="absolute top-[1px] bottom-[1px] left-[1px] z-0 bg-white w-[110px] group-hover:w-[calc(100%-1px)] transition-all duration-500 ease-in-out rounded-full" />

			{/* Text and Arrow */}
			<span className="relative z-10 flex items-center whitespace-nowrap">
				<span className={`px-6 py-2 ${textColor} transition-colors duration-500 group-hover:text-primary`}>
					{text}
				</span>
				<span className={`pr-4 ${arrowColor} transition-colors duration-500`}>
					›
				</span>
			</span>
		</button>
	);
}
