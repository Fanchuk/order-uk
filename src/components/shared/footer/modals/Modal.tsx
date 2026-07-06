'use client'

import { X } from 'lucide-react'

interface Props {
    title: string
    content: string
    onClose: () => void
}

export default function Modal({ title, content, onClose }: Props) {
    return (
        <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4" 
        onClick={onClose}>
            <div 
            className="bg-white rounded-2xl max-w-[600px] w-full max-h-[80vh] flex flex-col shadow-2xl" 
            onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="font-bold text-[18px] text-[#03081f]">{title}</h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <X size={16} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-200">
                    <div className="text-[14px] text-gray-700 leading-relaxed">
                        {content.split('\n').map((line, i) => (
                            <p key={i} className={`mb-2 ${line.startsWith('**') ? 'font-bold text-[#03081f]' : ''}`}>
                                {line.replace(/\*\*/g, '')}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
