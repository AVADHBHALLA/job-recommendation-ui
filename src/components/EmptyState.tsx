interface Props {
    icon?: string;
    title: string;
    description?: string;
}

const EmptyState = ({ icon = "📭", title, description }: Props) => (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <span className="text-5xl mb-3">{icon}</span>
        <h3 className="text-base font-semibold text-slate-700">{title}</h3>
        {description && <p className="text-sm mt-1">{description}</p>}
    </div>
);

export default EmptyState;