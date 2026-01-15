<template>
  <div class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    
    <div
      class="bg-white w-full max-w-2xl p-10 rounded-3xl shadow-2xl flex flex-col gap-6 text-center"
    >

      <h1 class="text-3xl font-bold text-gray-800">
        Seja bem-vindo ao <span class="text-blue-600">VidaPlus</span>
      </h1>

      <p class="text-gray-600 text-lg leading-relaxed">
        Seu sistema de gestão de saúde, desenvolvido para otimizar atendimentos,
        centralizar informações e facilitar o cuidado com pacientes.
      </p>

      <div class="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-blue-700 text-sm">
        💙 Mais eficiência, segurança e organização para sua rotina na saúde.
      </div>

      <NuxtLink
        to="/login"
        class="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold py-4 rounded-xl transition-all shadow-md"
      >
        Acessar sistema
      </NuxtLink>
    </div>

  </div>
</template>
