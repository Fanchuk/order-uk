'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { formatPrice } from '@/src/lib/utils'
import { Trash2, Pencil, Plus, X } from 'lucide-react'

const formShema = z.object({
    name: z.string().min(1, 'Name required'),
    price: z.coerce.number().min(1, 'Price required')
})

type FormData = z.infer<typeof formShema>

interface MenuItem {
    id: number
    name: string
    price: number
    restaurantId: number
}

export default function MenuClient({
    restaurantId,
    initialItems
}: {
    restaurantId: number,
    initialItems: MenuItem[]
}) {
    const [items, setItems] = useState(initialItems)
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
    const [showForm, setShowForm] = useState(false)

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(formShema)
    })

    const startAdd = () => {
        setEditingItem(null)
        setShowForm(true)
        reset({ name: '', price: 0 })
    }

    const startEdit = (item: MenuItem) => {
        setEditingItem(item)
        setShowForm(true)
        reset({ name: item.name, price: item.price / 100 })
    }

    const closeForm = () => {
        setEditingItem(null)
        setShowForm(false)
        reset()
    }

    const onSubmit = async (data: FormData) => {
        const payload = {
            ...data,
            price: Math.round(data.price * 100),
            restaurantId
        }

        try {
            if (editingItem) {
                const res = await fetch(`/api/admin/menu/${editingItem.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })

                if (!res.ok) throw new Error()
                const updated = await res.json()

                setItems(prev => prev.map(i => i.id === updated.id ? updated : i))
                toast.success('Item updated!')
            } else {
                const res = await fetch('/api/admin/menu', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                })

                if (!res.ok) throw new Error()
                const created = await res.json()

                setItems(prev => [...prev, created])
                toast.success('Item added!')
            }

            closeForm()

        } catch {
            toast.error('Something went wrong!')
        }
    }

    const handleDelete = async (itemId: number) => {
        if (!confirm('Delete?')) return

        try {
        const res = await fetch(`/api/admin/menu/${itemId}`, {
            method: 'DELETE'
        })

        if (!res.ok) throw new Error()

        setItems(prev => prev.filter(i => i.id !== itemId))
        
        toast.success('Item deleted!')

        } catch {
            toast.error('Could not delete')
        }
    }

   return (
       <div>
           <button onClick={startAdd} className="flex items-center gap-2 px-4 h-[44px] bg-[#fc8a06] text-white font-bold rounded-xl mb-6 hover:bg-[#e07a05] transition-colors">
               <Plus size={18} />
               Add Item
           </button>

           {showForm && (
               <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                   <div className="flex items-center justify-between mb-4">
                       <h2 className="font-bold text-[#03081f]">{editingItem ? 'Edit Item' : 'Add Item'}</h2>
                       <button onClick={closeForm}>
                           <X size={20} className="text-gray-400" />
                       </button>
                   </div>

                   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                       <div>
                           <label className="text-[13px] font-medium text-gray-700">Name</label>
                           <input
                               {...register('name')}
                               type="text"
                               placeholder="Margherita"
                               className="w-full h-[44px] mt-1 border border-gray-200 rounded-xl px-4 text-[14px] outline-none focus:border-[#fc8a06]"
                           />
                           {errors.name && <p className="text-red-500 text-[12px] mt-1">{errors.name.message}</p>}
                       </div>

                       <div>
                           <label className="text-[13px] font-medium text-gray-700">Price (£)</label>
                           <input
                               {...register('price')}
                               type="number"
                               step="0.01"
                               placeholder="8.99"
                               className="w-full h-[44px] mt-1 border border-gray-200 rounded-xl px-4 text-[14px] outline-none focus:border-[#fc8a06]"
                           />
                           {errors.price && <p className="text-red-500 text-[12px] mt-1">{errors.price.message}</p>}
                       </div>

                       <button type="submit" disabled={isSubmitting} className="h-[44px] bg-[#fc8a06] text-white font-bold rounded-xl hover:bg-[#e07a05] transition-colors disabled:opacity-50">
                           {isSubmitting ? 'Saving...' : editingItem ? 'Save Changes' : 'Add Item'}
                       </button>
                   </form>
               </div>
           )}

           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
               {items.length === 0 ? (
                   <div className="p-8 text-center text-gray-400">No items yet. Add your first!</div>
               ) : (
                   <table className="w-full text-left">
                       <thead>
                           <tr className="border-b border-gray-100 text-[13px] text-gray-500">
                               <th className="px-5 py-4 font-semibold">Name</th>
                               <th className="px-5 py-4 font-semibold">Price</th>
                               <th className="px-5 py-4 font-semibold">Actions</th>
                           </tr>
                       </thead>
                       <tbody>
                           {items.map((item) => (
                               <tr key={item.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                                   <td className="px-5 py-4 font-medium text-[#03081f]">{item.name}</td>
                                   <td className="px-5 py-4 font-bold text-[#028643]">{formatPrice(item.price)}</td>
                                   <td className="px-5 py-4">
                                       <div className="flex items-center gap-2">
                                           <button onClick={() => startEdit(item)} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-[#fc8a06] transition-colors">
                                               <Pencil size={15} />
                                           </button>
                                           <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors">
                                               <Trash2 size={15} />
                                           </button>
                                       </div>
                                   </td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
               )}
           </div>
       </div>
   )
}