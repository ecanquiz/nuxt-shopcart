<script setup lang="ts">
    const is_auth = ref(false);
    const processing = ref("");
    const failed = ref("");

    const api = useRuntimeConfig().public.api;
    const cookie = useCookie('auth_credientials');

    watchEffect(() => {
        if(cookie.value){
            is_auth.value = true;
        }else{
            is_auth.value = false;
        }
    })

    const logoutHandler = async () => {
        processing.value = "Logging out...";
        failed.value = "";
        try{
            const data = await $fetch(`${api}/api/logout`, {
                method: "DELETE",
                headers: {
                    'Authorization': 'Bearer '+cookie.value
                }
            });
            //if(data.message){
            if(true){

                cookie.value = null;
                navigateTo('/account/login');
            }
        }catch(e){
            failed.value = "Something went wrong!";
        }
        processing.value = "";
    }
</script>

<template>
    <!-- Navigation -->
    <nav class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center space-x-4">
                    <NuxtLink to="/">
                        <span class="text-2xl font-bold text-primary-600">Bodega.Com</span>                   
                    </NuxtLink>
                </div>                
                <div class="flex items-center space-x-4">
                    <div class="max-w-6xl m-auto flex items-center justify-between py-3 px-4">            
                      <ul class="font-semibold flex items-center">
                        <NuxtLink class="px-6" to="/">Home</NuxtLink>
                          <div v-if="true" class="flex items-center">
                            <NuxtLink class="px-6" to="/dashboard">Dashboard</NuxtLink>
                              <form @submit.prevent="logoutHandler" method="post">
                                <Button text="Logout" />
                              </form>
                          </div>
                          <div class="flex items-center" v-else>
                            <NuxtLink class="px-6" to="/account/login">Login</NuxtLink>
                            <NuxtLink class="px-6" to="/account/register">Register</NuxtLink>
                          </div>
                      </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
