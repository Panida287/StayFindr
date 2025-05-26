export function stripHTML(html: string): string {
	return html.replace(/<[^>]*>?/gm, '');
}
