export default defineEventHandler(async (event: any) => {
    // Clear the current user session
await clearUserSession(event)
return sendRedirect(event, '/')
})