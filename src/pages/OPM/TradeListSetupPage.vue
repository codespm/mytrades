<template>
  <div class="p-1 text-muted" v-if="!isLoading">
    <label class="my-2 text-warning">Columns</label>
    <br/>
    <small>Display/Hide columns of the grid</small>
    <br/>
    <br/>
    <div class="container-fluid text-muted">
      <div class="row">
        <template v-for="(column, name) in columns" :key="name">
          <div class="col-6 col-md-6 col-lg-1 bg-dark bg-opacity-50 m-0 border border-dark p-2">
            <input class="form-check-input shadow-none border-warning" type="checkbox" 
              :checked="column.visible" id="{{name}}" v-model="columns[name].visible">
            &nbsp;<strong>{{column.value}}</strong><br/>{{name}}
          </div>
        </template>
      </div>
    </div>
    <hr class="border border-2 border-dark" />
    <div class="col">
      <div class="row m-0">
        <div class="col-12 p-0 text-muted text-end">
          <button class="btn btn-warning" @click.prevent="save()">Save</button>&nbsp;
          <button class="btn btn-dark" @click.prevent="reset()">reset</button>
        </div>
     </div>
    </div>
    <br/>
  </div>
  <div v-else class="text-white">
    <div class="d-flex justify-content-center">
      <div class="spinner-border m-5 text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import apiTrade from '@/services/trade'
import usePage from '@/composables/usePage'

export default {
  name: 'OPMTradeListSetupPage',
  setup () {
    const router    = useRouter()
    const store     = useStore()
    const page      = usePage({title: 'Trade List: Setup OPM'})
    const columns   = ref({})

    onMounted(async () => {
      await store.dispatch('loadTradeSetupOPM')
      columns.value         = store.state.tradeSetupOPM.columns
      page.isLoading.value  = store.state.tradeSetupOPM.isLoading
    })

    const save = () => {
      let columnsPut = {} 
      for (const propName in columns.value) {
        columnsPut[propName] = {...columns.value[propName]}
      }
      apiTrade.saveSetup(columnsPut).then(() => {
        page.setMessage({ value: '¡save setup!', type: 'success'})
        router.push({ name: 'OPMTradeListPage'})
      }).catch((err) => {
        page.setMessage({ value: err, type: 'danger'})
        router.push({ name: 'OPMTradeListPage'})
      })
    }

    const reset = () => {
      apiTrade.resetSetup().then(() => {
        page.setMessage({ value: '¡reset setup!', type: 'success'})
        router.push({ name: 'OPMTradeListPage'})
      }).catch((err) => {
        page.setMessage({ value: err, type: 'danger'})
        router.push({ name: 'OPMTradeListPage'})
      })
    }

    return {
      columns,
      isLoading : page.isLoading,
      save,
      reset
    }
  }
}
</script>
