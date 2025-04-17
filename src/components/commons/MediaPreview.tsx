export function MediaPreview({ url }: { url: string }) {
	if (!url) return null;
	return <img src={url} alt="preview" className="w-24 h-24 object-cover rounded border" />;
}
