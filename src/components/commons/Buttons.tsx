import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

/**
 * Props for the CommonButton component.
 */
export interface CommonButtonProps {
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

/**
 * A reusable button component that renders either a <button> or <Link>,
 * depending on whether the `to` prop is provided.
 */
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
	const componentProps = isLink
		? { to: to! }
		: { onClick, type, disabled };

	const Component = (isLink ? Link : 'button') as React.ElementType;

	return (
		<Component
			{...componentProps}
			className={clsx(
				bgColor,
				textColor,
				hoverColor,
				hoverTextColor,
				'px-6 py-2 rounded-full text-sm transition',
				fullWidth && 'w-full',
				borderClass,
				className,
				disabled && 'opacity-50 cursor-not-allowed'
			)}
		>
			{children}
		</Component>
	);
}

/**
 * Props for the SplitButton component.
 */
export interface SplitButtonProps {
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

/**
 * A call-to-action split button with a highlight animation and arrow,
 * renders as a <Link> or <button> depending on the `to` prop.
 */
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
	const componentProps = isLink
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
			<span
				className="absolute top-[1px] bottom-[1px] left-[1px] z-0
				bg-white w-[85%] group-hover:w-[calc(100%-3px)]
				transition-all duration-500 ease-in-out rounded-full"
			/>
			<span className="relative z-10 flex items-center whitespace-nowrap">
				<span className={clsx('px-6 py-1 transition-colors duration-500', textColor, hoverTextColor)}>
					{text}
				</span>
				<span className={clsx('pr-[10px] transition-colors duration-500', arrowColor, arrowHoverColor)}>
					›
				</span>
			</span>
		</Component>
	);
}
