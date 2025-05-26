/**
 * Props for MediaPreview component.
 */
type MediaPreviewProps = {
	/** Image source URL */
	url: string;
	/** Tailwind width class (e.g. "w-24"). Default: w-24 */
	width?: string;
	/** Tailwind height class (e.g. "h-24"). Default: h-24 */
	height?: string;
	/** Additional Tailwind utility classes */
	className?: string;
};

/**
 * Displays a responsive image preview.
 * Commonly used for avatar previews, media uploads, or gallery thumbnails.
 */
export function MediaPreview({
	                             url,
	                             width = 'w-24',
	                             height = 'h-24',
	                             className = '',
                             }: MediaPreviewProps) {
	if (!url) return null;

	return (
		<img
			src={url}
			alt="Uploaded media preview"
			className={`${width} ${height} object-cover rounded border ${className}`}
		/>
	);
}
