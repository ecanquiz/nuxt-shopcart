export default defineNuxtRouteMiddleware(async (to) => {
  const session = useUserSession()
  
  try {
    // Only fetch session if we don't have a user value
    if (!session.user?.value) {
      await session.fetch()
    }

    // Get a plain object representation of the user
    const user = session.user?.value ? { ...session.user.value } : null
    const isAuthenticated = !!user
    
    // Redirect to login if not authenticated and trying to access protected route
    if (to.meta.requiresAuth && !isAuthenticated) {
      return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
    
    // Redirect to home if authenticated and trying to access login page
    if (to.path === '/auth/login' && isAuthenticated) {
      return navigateTo('/')
    }
    
  } catch (error) {
    console.error('Auth middleware error:', error)
    // In case of error, redirect to login for protected routes
    if (to.meta.requiresAuth) {
      return navigateTo(`/auth/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }
  }
})