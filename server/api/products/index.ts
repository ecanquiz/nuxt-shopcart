import { defineEventHandler, sendError, createError } from 'h3';
import { IProduct } from '../../../types/product';

export default defineEventHandler(async (event) => {
    try {
        // Validate request method
        if (event.node.req.method !== 'GET') {
            return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }));
        }

        // Fetch products from external API
        const products: IProduct[] = await $fetch(`${process.env.APP_API_URL}/api/sales-catalog`, {
            headers: {
                Authorization: `Bearer ${process.env.APP_API_SHARED_TOKEN}`
            }
        });

        // Validate response
        if (!Array.isArray(products)) {
            return sendError(event, createError({ statusCode: 500, statusMessage: 'Invalid products data' }));
        }

        // Basic validation for product fields
        const isValidProduct = (product: IProduct) => {
            return typeof product.name === 'string' &&
                typeof product.image === 'string' &&
                typeof product.price === 'number';
        };

        const validProducts = products.filter(isValidProduct);

        return validProducts;
    } catch (error) {
        console.error(error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});

