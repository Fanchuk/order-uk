'use client'

interface Props {
    title: string
    links: string[]
    onLinkClick: (label: string) => void
}

export default function FooterLinks({ title, links, onLinkClick }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-[16px] font-bold text-black">{title}</h3>
            <ul className="flex flex-col gap-3">
                {links.map((label) => (
                    <li key={label}>
                        <button
                            onClick={() => onLinkClick(label)}
                            className="text-[15px] font-normal text-black underline underline-offset-2 decoration-black/40 hover:text-[#fc8a06] transition-colors text-left">
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
