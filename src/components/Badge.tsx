type Variant = "primary" | "success" | "warning" | "danger" | "info" | "secondary";

const variantClasses: Record<Variant, string> = {
    primary:   "bg-blue-50 text-blue-600",
    success:   "bg-green-50 text-green-600",
    warning:   "bg-yellow-50 text-yellow-600",
    danger:    "bg-red-50 text-red-600",
    info:      "bg-cyan-50 text-cyan-600",
    secondary: "bg-slate-100 text-slate-500",
};

interface Props {
    label: string;
    variant?: Variant;
}

const Badge = ({ label, variant = "secondary" }: Props) => (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${variantClasses[variant]}`}>
        {label}
    </span>
);

export default Badge;