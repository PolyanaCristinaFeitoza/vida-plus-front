<template>
  <div class="max-w-md mx-auto mt-6 p-4 bg-white rounded shadow">
    <h1 class="text-xl font-bold mb-4 text-gray-800">
      Editar Profissional
    </h1>

    <div class="flex flex-col gap-3 mb-4">
      <input
        v-model="nome"
        class="border px-2 py-1 rounded text-gray-800"
        placeholder="Nome"
      />
      <input
        v-model="especialidade"
        class="border px-2 py-1 rounded text-gray-800"
        placeholder="Especialidade"
      />
    </div>

    <div class="flex gap-2">
      <Button variant="primary" @click="salvar">
        Salvar
      </Button>
      <Button variant="secondary" @click="cancelar">
        Cancelar
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


