import { defineEventHandler, sendError, createError } from 'h3';
import { IProduct } from '../../../types/product';

export default defineEventHandler(async (event) => {
    const { page = 1, limit = 10 } = getQuery(event);

    // Fetch products from external API
    const pageNumber = parseInt(page as string) || 1;
    const pageSizeNumber = parseInt(limit as string) || 10;
    // Calcular start y end para paginado (si la API no lo soporta directamente)
    const start = (pageNumber - 1) * pageSizeNumber;
    const end = start + pageSizeNumber;
    try {
        // Validate request method
        if (event.node.req.method !== 'GET') {
            return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }));
        }

        const products: IProduct[] = await $fetch(`${process.env.APP_API_URL}/api/sales-catalog?page=${pageNumber}&limit=${pageSizeNumber}`, {
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
        console.log(validProducts);
        return {
            data: validProducts.slice(start, end),
            pagination: {
                page: pageNumber,
                pageSize: pageSizeNumber,
                total: products.length,
                totalPages: Math.ceil(products.length / pageSizeNumber),
            }
        };
    } catch (error) {
        console.error(error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});

