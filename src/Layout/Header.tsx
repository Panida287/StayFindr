import useBreakpoint from "../hooks/useBreakpoint.ts";

export default function Header() {
    const isMobile = useBreakpoint(480);

    return (
        <>
            {!isMobile && <header>Desktop header</header>}
            {isMobile && <header>Mobile header</header>}
        </>
    );
}
