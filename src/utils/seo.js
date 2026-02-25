export const updateMetaTags = (title, description, keywords) => {
    if (title) {
        document.title = title;
    }

    if (description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', description);
    }

    if (keywords) {
        let metaKey = document.querySelector('meta[name="keywords"]');
        if (!metaKey) {
            metaKey = document.createElement('meta');
            metaKey.setAttribute('name', 'keywords');
            document.head.appendChild(metaKey);
        }
        metaKey.setAttribute('content', keywords);
    }
};
