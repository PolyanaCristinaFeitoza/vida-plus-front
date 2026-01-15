<template>

  <div class="min-h-screen bg-gray-50 flex items-start justify-center p-8">

    <div class="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10">

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800">
          Editar <span class="text-blue-600">Profissional</span>
        </h1>
        <p class="mt-2 text-gray-600">
          Atualize as informações do profissional de saúde
        </p>
      </div>

      <div class="flex flex-col gap-5 mb-10">
        <input
          v-model="nome"
          placeholder="Nome do profissional"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition"
        />

        <input
          v-model="especialidade"
          placeholder="Especialidade"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition"
        />
      </div>

      <div class="flex justify-end gap-4">
        <Button
          variant="secondary"
          class="px-6 py-3"
          @click="cancelar"
        >
          Cancelar
        </Button>

        <Button
          variant="primary"
          class="px-6 py-3"
          @click="salvar"
        >
          Salvar alterações
        </Button>
      </div>
    </div>

    <ConfirmModal
      :open="modalAberto"
      :title="modalTitulo"
      :message="modalMensagem"
      @confirm="confirmarModal"
      @cancel="fecharModal"
    />

  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from '~/components/Button.vue'
import ConfirmModal from '~/components/ConfirmModal.vue'
import { useProfissionais } from '~/composables/useProfissionais'

const route = useRoute()
const router = useRouter()
const { profissionais, editar } = useProfissionais()

const nome = ref('')
const especialidade = ref('')

const modalAberto = ref(false)
const modalTitulo = ref('')
const modalMensagem = ref('')
const acaoAoConfirmar = ref<null | (() => void)>(null)

onMounted(() => {
  const id = Number(route.params.id)
  const profissional = profissionais.value.find(p => p.id === id)

  if (!profissional) {
    modalTitulo.value = 'Profissional não encontrado'
    modalMensagem.value =
      'O profissional selecionado não foi encontrado.'
    acaoAoConfirmar.value = () => {
      router.push('/profissionais')
    }
    modalAberto.value = true
    return
  }

  nome.value = profissional.nome
  especialidade.value = profissional.especialidade
})

function salvar() {
  const id = Number(route.params.id)

  editar(id, {
    id,
    nome: nome.value,
    especialidade: especialidade.value
  })

  modalTitulo.value = 'Sucesso'
  modalMensagem.value = 'Profissional atualizado com sucesso!'
  acaoAoConfirmar.value = () => {
    router.push('/profissionais')
  }
  modalAberto.value = true
}

function cancelar() {
  router.push('/profissionais')
}

function fecharModal() {
  modalAberto.value = false
  acaoAoConfirmar.value = null
}

function confirmarModal() {
  if (acaoAoConfirmar.value) {
    acaoAoConfirmar.value()
  }
  fecharModal()
}
</script>


