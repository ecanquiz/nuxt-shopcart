<template>
        <!-- Hero Section -->
        <div class="relative bg-gradient-to-br from-primary-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl font-bold text-primary-800 dark:text-white mb-8 animate-bounce-slow">Featured Collection</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Product Cards with Enhanced Design -->
                <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl">
                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722165/AbhirajK/Abhirajk.webp" 
                        alt="Casual Wear" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-primary-800 dark:text-white">Casual Wear</h3>
                        <div class="flex justify-between items-center mt-2">
                            <p class="text-primary-600 font-bold">₹99.99</p>
                            <span class="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">New</span>
                        </div>
                        <button class="mt-4 w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>

                <!-- Additional Product Cards with Similar Enhanced Design -->
                <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl">
                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722163/AbhirajK/Abhirajk%20mykare.webp" 
                        alt="Summer Collection" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-primary-800 dark:text-white">Summer Collection</h3>
                        <div class="flex justify-between items-center mt-2">
                            <p class="text-primary-600 font-bold">₹79.99</p>
                            <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Sale</span>
                        </div>
                        <button class="mt-4 w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>

                <!-- Two More Product Cards -->
                <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl">
                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk2.webp" 
                        alt="Winter Special" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-primary-800 dark:text-white">Winter Special</h3>
                        <div class="flex justify-between items-center mt-2">
                            <p class="text-primary-600 font-bold">₹129.99</p>
                            <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Limited</span>
                        </div>
                        <button class="mt-4 w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div class="bg-white dark:bg-gray-700 rounded-2xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-2xl">
                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722160/AbhirajK/Abhirajk4.webp" 
                        alt="Premium Collection" class="w-full h-64 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-primary-800 dark:text-white">Premium Collection</h3>
                        <div class="flex justify-between items-center mt-2">
                            <p class="text-primary-600 font-bold">₹199.99</p>
                            <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Premium</span>
                        </div>
                        <button class="mt-4 w-full bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Featured Categories with Interactive SVG -->
    <div class="bg-white dark:bg-gray-900 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-primary-800 dark:text-white mb-8">Featured Categories</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="relative category-overlay overflow-hidden rounded-2xl shadow-lg">
                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722161/AbhirajK/Abhirajk3.webp" 
                        alt="Men's Wear" class="w-full h-64 object-cover">
                    <div class="absolute inset-0 bg-primary-500 bg-opacity-40 hover:bg-opacity-50 transition-all duration-300 rounded-2xl"></div>
                    <span class="absolute bottom-4 left-4 text-white font-semibold text-xl drop-shadow-lg">Men's Wear</span>
                </div>
                <div class="relative category-overlay overflow-hidden rounded-2xl shadow-lg">
                    <img src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1735722160/AbhirajK/Abhirajk4.webp" 
                        alt="Accessories" class="w-full h-64 object-cover">
                    <div class="absolute inset-0 bg-primary-500 bg-opacity-40 hover:bg-opacity-50 transition-all duration-300 rounded-2xl"></div>
                    <span class="absolute bottom-4 left-4 text-white font-semibold text-xl drop-shadow-lg">Accessories</span>
                </div>
            </div>
        </div>
    </div>
</template>