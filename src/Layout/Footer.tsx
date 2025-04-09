import useBreakpoint from "../hooks/useBreakpoint.ts";

export default function Header() {
    const isMobile = useBreakpoint(480);

    return (
        <>
            {!isMobile && <footer>Desktop footer</footer>}
            {isMobile && <nav>Mobile navigation</nav>}
        </>
    );
}
