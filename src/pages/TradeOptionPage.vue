<template>
  <div class="py-2 text-white text-opacity-75" v-show="showOK">
    Seleccione una opción
    <div class="row">
        <div class="col-12 col-md-6 py-2">
            <div class="card bg-dark">
                <div class="card-body text-white">
                    <h5 class="card-title text-warning">Opci&oacute;n Matias</h5>
                    La que se utiliza para el curso.
                </div>
                <div class="card-footer">
                    <div class="d-grid gap-2">
                        <button class="btn btn-warning" @click.prevent="selectOption('opm')">Seleccionar OPM</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-6 py-2">
            <div class="card bg-dark">
                <div class="card-body text-white">
                    <h5 class="card-title text-warning">Opci&oacute;n Franco</h5>
                    La que desarrollo Franco para uso personal.
                </div>
                <div class="card-footer">
                    <div class="d-grid gap-2">
                        <button class="btn btn-warning" @click.prevent="selectOption('opf')">Seleccionar OPF</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-warning text-opacity-75 bg-secondary bg-opacity-25 py-2 px-2">
        Se pueden usar ambas opciones en simultaneo, pulsando en el link en la parte superior derecha 
        denominado OPM u OPF, ahora identificado como OPX hasta que seleccione una opción.
    </div>
  </div>
</template>

<script>
import usePage from '@/composables/usePage'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'TradeOptionPage',
  setup () {
    const router    = useRouter()
    const store     = useStore()
    let showOK      = false
    const option    = store.getters.getTradeOptionSelected

    if(option === 'opm') router.push({ name: 'OPMTradeListPage'})
    else if(option === 'opf') router.push({ name: 'OPFTradeListPage'})
    else showOK = true

    usePage({ title: 'Option Trade' })

    const selectOption = (value) => {
        store.commit('setTradeOptionSelected', value)
        if(value === 'opm') router.push({ name: 'OPMTradeListPage'})
        if(value === 'opf') router.push({ name: 'OPFTradeListPage'})
    }

    return {
      selectOption,
      showOK
    }
  }
}
</script>
