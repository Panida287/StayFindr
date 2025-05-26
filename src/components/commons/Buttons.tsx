import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import clsx from 'clsx';

export interface CommonButtonProps {
	/** Optional URL; if provided and not disabled, renders as <Link> */
	to?: string;
	onClick?: () => void;
	className?: string;
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	bgColor?: string;
	textColor?: string;
	hoverColor?: string;
	hoverTextColor?: string;
	fullWidth?: boolean;
	borderClass?: string;
}

/** Button that optionally renders as a React-Router Link when `to` is set */
export function CommonButton({
	                             to,
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
	const isLink = !disabled && Boolean(to);

	// If it's a link, use LinkProps; otherwise button props
	type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> & {
		type: CommonButtonProps['type'];
		onClick?: () => void;
	};
	type AnchorProps = LinkProps;

	const componentProps: ButtonProps | AnchorProps = isLink
		? { to: to! }
		: { onClick, type, disabled };

	const Component = (isLink ? Link : 'button') as React.ElementType;

	return (
		<Component
			{...componentProps}
			className={`
        ${bgColor} ${textColor} ${hoverColor} ${hoverTextColor}
        px-6 py-2 rounded-full text-sm transition
        ${fullWidth ? 'w-full' : ''}
        ${borderClass}
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
		>
			{children}
		</Component>
	);
}

export interface SplitButtonProps {
	/** Optional URL; if provided, renders as <Link> */
	to?: string;
	onClick?: () => void;
	text: string;
	textColor?: string;
	hoverTextColor?: string;
	arrowColor?: string;
	arrowHoverColor?: string;
	bgColor?: string;
	borderColor?: string;
	className?: string;
	target?: React.HTMLAttributeAnchorTarget;
	rel?: string;
}

/** A “split” button that either links or fires onClick */
export function SplitButton({
	                            to,
	                            onClick,
	                            text,
	                            textColor = 'text-primary',
	                            hoverTextColor = 'group-hover:text-primary',
	                            arrowColor = 'text-[#A97C50]',
	                            arrowHoverColor = 'group-hover:text-primary',
	                            bgColor = 'bg-secondary',
	                            borderColor = 'border-[#A97C50]',
	                            className = '',
	                            target,
	                            rel,
                            }: SplitButtonProps) {
	const isLink = Boolean(to);

	type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
		onClick?: () => void;
	};
	type AnchorProps = LinkProps & {
		target?: React.HTMLAttributeAnchorTarget;
		rel?: string;
	};

	const componentProps: ButtonProps | AnchorProps = isLink
		? { to: to!, target, rel }
		: { onClick };

	const Component = (isLink ? Link : 'button') as React.ElementType;

	return (
		<Component
			{...componentProps}
			className={clsx(
				'relative group overflow-hidden inline-flex items-center rounded-full border border-r-0',
				borderColor,
				bgColor,
				className
			)}
		>
			{/* Animated highlight */}
			<span
				className="absolute top-[1px] bottom-[1px] left-[1px] z-0
                   bg-white w-[85%] group-hover:w-[calc(100%-3px)]
                   transition-all duration-500 ease-in-out rounded-full"
			/>

			{/* Text + arrow */}
			<span className="relative z-10 flex items-center whitespace-nowrap">
        <span
	        className={clsx(
		        'px-6 py-1 transition-colors duration-500',
		        textColor,
		        hoverTextColor
	        )}
        >
          {text}
        </span>
        <span
	        className={clsx(
		        'pr-[10px] transition-colors duration-500',
		        arrowColor,
		        arrowHoverColor
	        )}
        >
          ›
        </span>
      </span>
		</Component>
	);
}
