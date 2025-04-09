interface ButtonProps {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
}

export function Button({text, onClick, type = "button", variant = "primary"}: ButtonProps) {
    const baseStyle = "px-4 py-2 rounded text-white font-bold transition-all";
    const variantStyles = {
        primary: "primary",
        secondary: "secondary",
        accent: "accent",
        danger: "error",
        success: "success",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${variantStyles[variant]}`}
        >
            {text}
        </button>
    );
}