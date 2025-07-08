// auth.d.ts
declare module '#auth-utils' {
    interface User {
        id: string
        name?: string | null
        email?: string | null
        image?: string | null
        provider?: string
        providerId?: string
    }
  
    // interface UserSession {
    //     id: string
    //     name?: string | null
    //     email?: string | null
    //     image?: string | null
    //     provider?: string
    //     providerId?: string
    // }
  
    // interface SecureSessionData {
    //     id: string
    //     name?: string | null
    //     email?: string | null
    //     image?: string | null
    //     provider?: string
    //     providerId?: string
    // }
  }
  
  export {}
  