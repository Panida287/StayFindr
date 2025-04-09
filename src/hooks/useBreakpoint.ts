import { useEffect, useState } from "react";

export default function useBreakpoint(breakpoint = 0) {
    const [isBreakpoint, setBreakpoint] = useState(() => window.innerWidth <= breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setBreakpoint(window.innerWidth <= breakpoint);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isBreakpoint;
}
