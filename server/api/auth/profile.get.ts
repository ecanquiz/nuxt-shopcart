export default defineEventHandler(async (event) => {
   // Get the current user session
const session = await getUserSession(event)
return session.user
})