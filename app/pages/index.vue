<template>
  <div class="flex justify-center mt-20">
    <div class="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg flex flex-col gap-6 text-center">
      <h1 class="text-2xl font-bold text-gray-800">
        Seja bem-vindo ao VidaPlus
      </h1>

      <p class="text-gray-600">
        Seu sistema de gestão de saúde, pensado para facilitar o cuidado com você.
      </p>

      <NuxtLink
        to="/login"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Acessar sistema
      </NuxtLink>
    </div>
  </div>
</template>
