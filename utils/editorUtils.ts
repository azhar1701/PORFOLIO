import type { AdminTab } from '../pages/AdminPage';
import type { FieldConfig } from '../components/GenericEditorModal';

export const getEditorFields = (section: AdminTab): FieldConfig[] => {
    switch (section) {
        case 'Expertise':
            return [
                { name: 'title', label: 'Title', type: 'text', required: true },
                { name: 'iconName', label: 'Icon Name (e.g., WaterIcon)', type: 'text', required: true },
                { name: 'tools', label: 'Tools (comma-separated)', type: 'text', required: true },
            ];
        case 'Credentials':
            return [
                { name: 'name', label: 'Credential Name', type: 'text', required: true },
            ];
        case 'Testimonials':
            return [
                { name: 'quote', label: 'Quote', type: 'textarea', required: true },
                { name: 'author', label: 'Author', type: 'text', required: true },
                { name: 'title', label: 'Author\'s Title', type: 'text', required: true },
            ];
        case 'Blog Posts':
            return [
                { name: 'id', label: 'ID', type: 'number', required: true },
                { name: 'title', label: 'Title', type: 'text', required: true },
                { name: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
                { name: 'imageUrl', label: 'Image URL', type: 'url', required: true },
                { name: 'link', label: 'Post Link', type: 'url', required: true },
                { name: 'metaDescription', label: 'SEO Meta Description', type: 'textarea' },
                { name: 'ogImage', label: 'OpenGraph Image URL', type: 'url' },
            ];
        default:
            return [];
    }
};
