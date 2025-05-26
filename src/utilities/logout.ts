export function logout(): void {
	localStorage.removeItem("SFUsername");
	localStorage.removeItem("SFToken");
	window.location.href = "/";
}
