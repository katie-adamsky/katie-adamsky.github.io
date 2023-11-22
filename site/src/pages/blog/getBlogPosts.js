import { createClient } from 'contentful';



export const getBlogPosts = async () => {
    try {
        const client = createClient({
            accessToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN,
            space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
        });
        const response = await client.getEntries({
        content_type: 'pageBlogPost',
        });
        return response.items;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};