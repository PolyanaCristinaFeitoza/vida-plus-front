<template>
  <div class="max-w-md mx-auto mt-6 p-4 bg-white rounded shadow">
    <h1 class="text-xl font-bold mb-4 text-gray-800">Novo Profissional</h1>

    <div class="flex flex-col gap-3 mb-4">
      <label class="text-gray-800">
        Nome
        <input v-model="nome" class="w-full border px-2 py-1 rounded text-gray-400" />
      </label>

      <label class="text-gray-800">
        Especialidade
        <input v-model="especialidade" class="w-full border px-2 py-1 rounded text-gray-400" />
      </label>
    </div>

    <div class="flex gap-2">
      <Button variant="primary" @click="salvar">Salvar</Button>
      <Button variant="secondary" @click="cancelar">Cancelar</Button>
    </div>

    <MessageModal
      :open="modalAberto"
      :title="modalTitulo"
      :message="modalMensagem"
      @close="fecharModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'
import Button from '~/components/Button.vue'
import MessageModal from '~/components/MessageModal.vue'
import { useProfissionais } from '../../composables/useProfissionais'

const router = useRouter()
const { adicionar } = useProfissionais()

const nome = ref('')
const especialidade = ref('')

const modalAberto = ref(false)
const modalTitulo = ref('')
const modalMensagem = ref('')
const redirectAposFechar = ref(false)

function abrirModal(titulo: string, mensagem: string, redirect = false) {
  modalTitulo.value = titulo
  modalMensagem.value = mensagem
  modalAberto.value = true
  redirectAposFechar.value = redirect
}

function fecharModal() {
  modalAberto.value = false

  if (redirectAposFechar.value) {
    router.push('/profissionais')
  }
}

function salvar() {
  if (!nome.value || !especialidade.value) {
    abrirModal(
      'Campos obrigatórios',
      'Preencha todos os campos antes de salvar.'
    )
    return
  }

  adicionar({
    id: Date.now(),
    nome: nome.value,
    especialidade: especialidade.value
  })

  abrirModal(
    'Sucesso',
    'Profissional cadastrado com sucesso!',
    true
  )
}

function cancelar() {
  router.push('/profissionais')
}
</script>


