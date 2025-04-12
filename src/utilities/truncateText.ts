export function truncateText(text: string, maxLength: number): string {
	if (!text) return '';

	if (text.length <= maxLength) return text;

	const trimmed = text.slice(0, maxLength).trim();
	const lastSpace = trimmed.lastIndexOf(' ');

	if (lastSpace === -1) return trimmed + '...';

	return trimmed.slice(0, lastSpace) + '...';
}
