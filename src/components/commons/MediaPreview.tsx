type MediaPreviewProps = {
	url: string;
	/** Tailwind width class, e.g. "w-24" */
	width?: string;
	/** Tailwind height class, e.g. "h-24" */
	height?: string;
	/** Any additional classes you want to apply */
	className?: string;
};

export function MediaPreview({
	                             url,
	                             width = "w-24",
	                             height = "h-24",
	                             className = "",
                             }: MediaPreviewProps) {
	if (!url) return null;
	return (
		<img
			src={url}
			alt="preview"
			className={`${width} ${height} object-cover rounded border ${className}`}
		/>
	);
}
