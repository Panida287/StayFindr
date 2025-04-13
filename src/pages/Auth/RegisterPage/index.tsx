import { useEffect, useRef, useState } from "react";
import RegisterForm from "../../../components/accounts/RegisterForm.tsx";
import RegisterTypeSelector from "../../../components/accounts/RegisterTypeSelector.tsx";

export default function RegisterPage() {
    const [accountType, setAccountType] = useState<"traveler" | "manager" | null>(null);
    const [key, setKey] = useState(0);
    const formRef = useRef<HTMLDivElement>(null);

    function handleSelect(type: "traveler" | "manager") {
        if (type !== accountType) {
            setAccountType(type);
            setKey(prev => prev + 1);
        }
    }

    useEffect(() => {
        if (accountType && formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [accountType, key]);

    return (
        <>
            <RegisterTypeSelector accountType={accountType} setAccountType={handleSelect} />

            {accountType && (
                <div
                    ref={formRef}
                    key={key}
                    className="animate-slideDown transition-all duration-500 mt-8"
                >
                    <RegisterForm accountType={accountType} />
                </div>
            )}
        </>
    );
}
