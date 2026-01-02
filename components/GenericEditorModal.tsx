import React, { useState, useEffect } from 'react';
import type { EditableItem, AdminTab } from '../pages/AdminPage';

export type FieldConfig = {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'number' | 'url';
    required?: boolean;
};

interface GenericEditorModalProps {
    item: EditableItem | 'new';
    section: AdminTab;
    fields: FieldConfig[];
    onSave: (item: EditableItem) => void;
    onCancel: () => void;
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input {...props} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none" />
);

const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
    <textarea {...props} className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#00B4D8] focus:outline-none" />
);

const GenericEditorModal: React.FC<GenericEditorModalProps> = ({ item, section, fields, onSave, onCancel }) => {
    const isNew = item === 'new';
    const initialFormState = fields.reduce((acc, field) => {
        // @ts-ignore
        acc[field.name] = isNew ? '' : item[field.name] || '';
        return acc;
    }, {} as any);
    
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        setFormData(initialFormState);
    }, [item]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalItem = isNew ? formData : { ...item, ...formData };
        onSave(finalItem);
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onCancel}>
            <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-lg w-full shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                <h1 className="text-2xl font-bold text-white mb-6">{isNew ? 'Add' : 'Edit'} {section.slice(0, -1)}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map(field => (
                        <div key={field.name}>
                            <label className="text-slate-300 block mb-1">{field.label}</label>
                            {field.type === 'textarea' ? (
                                <TextArea name={field.name} value={formData[field.name]} onChange={handleChange} required={field.required} rows={4} />
                            ) : (
                                <Input name={field.name} type={field.type} value={formData[field.name]} onChange={handleChange} required={field.required} />
                            )}
                        </div>
                    ))}
                    <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
                        <button type="button" onClick={onCancel} className="bg-slate-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-500 transition-all">Cancel</button>
                        <button type="submit" className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-500 transition-all">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GenericEditorModal;
