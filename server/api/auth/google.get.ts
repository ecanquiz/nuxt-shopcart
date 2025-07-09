// This handles the OAuth callback from Google
export default defineOAuthGoogleEventHandler({
  async onSuccess(event: any, { user, tokens }: { user: any; tokens: any }) {

    await setUserSession(event, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.picture,
        provider: 'google',
        providerId: user.sub
      },
      // Any extra fields for the session data
      loggedInAt: new Date()
    })
    console.log('User session set successfully ', user )
    console.log('User session set successfully tokens ', tokens )
    return sendRedirect(event, '/')
  },
  onError(event: any, error: Error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/auth/login?error=auth_failed')
  }
})
