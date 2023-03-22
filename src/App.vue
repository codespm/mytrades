<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark shadow sticky-top" aria-label="Second navbar example">
    <div class="container-fluid">
      <router-link class="navbar-brand text-warning mx-2" :to="{ name: tradeOptionSelected }"><Icon name="BarChartFill"  /> {{ appWebName }}</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample02" aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse border-start border-warning" id="navbarsExample02">
        <ul class="navbar-nav me-auto">
          <li class="nav-item text-warning text-opacity-75 bg-warning bg-opacity-25 px-2">
            {{ title }}
          </li>
          <li class="nav-item px-2" :class="[message.text,message.bg]">
            <i class="bi bi-check-circle-fill" v-if="message.type === 'success'"></i> {{message.value}}
          </li>
        </ul>
        <div class="d-flex">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <button @click.prevent="selectOption()" class="btn btn-sm text-warning m-1 border-0 px-1 shadow-none">{{tradeOptionUnselected}}</button>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'AboutPage' }" class="btn btn-sm text-warning m-1 border-0 px-1 shadow-none">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  <div class="container-fluid p-2 rounded">
    <div class="col-sm-12 mx-auto p-2">
      <div class="card bg-transparent border-0 shadow-sm p-0">
        <div class="card-body bg-dark bg-opacity-50 py-0">
          <router-view/>
        </div>
      </div>
    </div>
  </div>

  <footer class="footer">
      <div class="text-end text-warning text-opacity-25 px-4 py-2">
        <small>{{ appWebName }} - ver. {{appWebVersion}}</small>
      </div>
    </footer>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon'

export default {
  components: {
    Icon
  },
  setup () {
    const store         = useStore()
    const router        = useRouter()
    const footerYear    = (new Date()).getFullYear();
    const appWebVersion = "0.1.0";
    const message       = computed(() => {
      let {type, value} = store.state.message
      let text          = "text-" + type + " text-opacity-10"
      let bg            = "bg-" + type + " bg-opacity-50"
      return { 
        text, 
        bg, 
        value,
        type,
      } 
    })
    const appWebName = computed(() => { return store.state.message.value ? "mT" : "myTrades" })

    const selectOption = () => {
      if(store.getters.getTradeOptionSelected !== '') {
        const value = store.getters.getTradeOptionSelected === 'opf' ? 'opm' : 'opf'
        store.commit('setTradeOptionSelected', value.toLowerCase())
        if(value.toLowerCase() === 'opm') router.push({ name: 'OPMTradeListPage'})
        if(value.toLowerCase() === 'opf') router.push({ name: 'OPFTradeListPage'})
      } else router.push({ name: 'TradeOptionPage'})
    }

    return {
      appWebVersion,
      appWebName,
      footerYear,
      title: computed(() => store.state.title),
      message,
      tradeOptionSelected: computed(() => store.getters.getTradeOptionSelected === null ? 'TradeOptionPage' : (store.getters.getTradeOptionSelected === 'opf' ? 'OPFTradeListPage' : 'OPMTradeListPage')),
      tradeOptionUnselected: computed(() => store.getters.getTradeOptionSelected === null ? 'OPX' : (store.getters.getTradeOptionSelected === 'opm' ? 'OPF' : 'OPM')),
      selectOption
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  background-color: #2c3e50 !important;
}
.footer {
  color: #202d3a;
}
table.table>tbody>tr:hover td,
table.table>tbody>tr:hover th {
  color: white;
  background-color: rgba(var(--bs-dark-rgb));
}
</style>