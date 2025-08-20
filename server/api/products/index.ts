import { defineEventHandler, sendError, createError } from 'h3';
import { IProduct } from '../../../types/product';
import type { SalesCatalogResponse, CatalogItem } from '~~/types/sales-catalog'
import { parsePhotos } from '~~/types/sales-catalog'

export default defineEventHandler(async (event) => {
    const { page = 1, limit = 10 } = getQuery(event);

    // Fetch products from external API
    const pageNumber = parseInt(page as string) || 1;
    const pageSizeNumber = parseInt(limit as string) || 10;
    // La API ya maneja paginación (page/limit)
    try {
        // Validate request method
        if (event.node.req.method !== 'GET') {
            return sendError(event, createError({ statusCode: 405, statusMessage: 'Method Not Allowed' }));
        }

        const { rows } = await $fetch<SalesCatalogResponse>(
            `${process.env.APP_API_WAREHOUSE_URL}/api/sales-catalog?page=${pageNumber}&limit=${pageSizeNumber}`,
            { headers: { Authorization: `Bearer ${process.env.APP_API_WAREHOUSE_SHARED_TOKEN}` } }
        )

        // Map API catalog items to IProduct shape
        const products: IProduct[] = rows.data.map((item: CatalogItem) => {
            const photosArr = typeof item.image_names === 'string' ? parsePhotos(item.image_names) : []
            return {
                name: item.name,
                image: photosArr[0] || '',
                // No price in API: set default or compute if available elsewhere
                price: Math.floor(Math.random() * 500) + 1,
            }
        });
        console.log('products',products);
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
            data: validProducts,
            pagination: {
                page: rows.current_page,
                pageSize: rows.per_page,
                total: rows.total,
                totalPages: rows.last_page,
            }
        };
    } catch (error) {
        console.error(error);
        return sendError(event, createError({ statusCode: 500, statusMessage: 'Internal Server Error' }));
    }
});
