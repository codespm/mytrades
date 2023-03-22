<template>
  <div class="card-title text-start pt-2">
    <router-link :to="{ name: 'OPMTradePage' }"           class="btn btn-sm btn-outline-warning m-1 border-0" type="submit"><i class="bi bi-plus-circle-fill"></i> New</router-link>
    <router-link :to="{ name: 'OPMTradeListDataPage' }"   class="btn btn-sm btn-outline-warning m-1 border-0" type="submit"><i class="bi bi-archive"></i> Data</router-link>
    <router-link :to="{ name: 'OPMTradeListSetupPage' }"  class="btn btn-sm btn-outline-warning m-1 border-0" type="submit"><i class="bi bi-gear"></i> Setup</router-link>
    <router-link :to="{ name: 'OPMCheckListPage' }"       class="btn btn-sm btn-outline-warning m-1 border-0" type="submit"><i class="bi bi-gear"></i> Checklist</router-link>
  </div>
  <div class="card-text">
    <div class="row align-items-start align-items-end">
      <div class="col-12 col-sm-2 mb-2">
        <div class="input-group">
          <select class="form-select form-select-sm border-0 shadow-sm bg-dark text-white" aria-label="Default select example" @change="filterData" v-model="filterStatus">
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="all" selected>All</option>
          </select>
          <div class="form-check form-check-inline mx-2">
            <input class="form-check-input shadow-none border-warning" type="checkbox" id="filterTest" value="option3" :checked="filterIsTest" @click="filterData(true)" v-model="filterIsTest">
            <label class="form-check-label text-muted" for="filterTest">Test</label>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-10 text-end mb-2 d-flex justify-content-end text-white">
        <span class="bg-secondary bg-opacity-10 px-1 text-white text-opacity-50 border-bottom border-secondary px-1 mx-2" title="MAT." onclick="alert(this.title);">
          <small><span class="d-none d-sm-inline">MAT</span> {{totalTrades.mat.toFixed(2)}}</small>
        </span>
        <span class="bg-secondary bg-opacity-10 px-1 text-white text-opacity-50 border-bottom border-secondary px-1" title="F.Kelly" onclick="alert(this.title);">
          <small><span class="d-none d-sm-inline">F.Kelly</span> {{totalTrades.fKelly.toFixed(2)}}%</small>
        </span>
        <span class="bg-secondary bg-opacity-10 px-1 text-white text-opacity-50 border-bottom border-secondary px-1 mx-2" title="AVG Return." onclick="alert(this.title);">
          <small><span class="d-none d-sm-inline">AVG Return</span> {{totalTrades.avgReturn.toFixed(2)}}%</small>
        </span>
        <span class="bg-secondary bg-opacity-10 px-1 text-white text-opacity-50 border-bottom border-secondary px-1" title="AVG Hits." onclick="alert(this.title);">
          <small><span class="d-none d-sm-inline">AVG Hits</span> {{totalTrades.porcOK.toFixed(2)}}%</small>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <span class="">
          <div class="card bg-transparent text-white text-muted border-0 rounded-0">
            <div class="card-body py-1 px-1">
              <small>
                {{totalTrades.sysRent}} 
                {{totalTrades.SLTP}} 
                {{totalTrades.position}} 
                {{totalTrades.question}} 
                {{totalTrades.SLPI}}
              </small>
            </div>
          </div>
        </span>
      </div>
    </div>
  </div>
  <div class="table-responsive pb-2">
    <table class="table table-sm table-hover w-100 my-2 border-dark bg-dark bg-opacity-50" style="width:1600px;">
      <thead class="table text-center bg-dark bg-opacity-75 text-white text-opacity-75 border-dark">
        <tr>
          <td class="border-start border-1 border-dark"></td>
          <td><small>&nbsp;</small></td>
          <td v-if="tradeSetup.average?.visible"><small>X</small></td>
          <td v-if="tradeSetup.priceIn?.visible"><small>EP</small></td>
          <td v-if="tradeSetup.mL?.visible"><small>M/L</small></td>
          <td v-if="tradeSetup.stopLoss?.visible"><small>SL</small></td>
          <td v-if="tradeSetup.takeProfit?.visible"><small>TP</small></td>
          <td v-if="tradeSetup.priceClose?.visible"><small>CP</small></td> 
          <td v-if="tradeSetup.risk?.visible"><small>Risk</small></td>
          <td v-if="tradeSetup.rf?.visible"><small>RF</small></td>
          <td v-if="tradeSetup.lM?.visible"><small>L/M</small></td>
          <td v-if="tradeSetup.rrr?.visible"><small>RRR</small></td>
          <td v-if="tradeSetup.r?.visible"><small>R</small></td>
          <td v-if="tradeSetup.r2?.visible"><small>R2</small></td>
          <td v-if="tradeSetup.return?.visible" class="border-end border-1 border-dark"><small>Return</small></td>
        </tr>
      </thead>
      <tbody class="text-white text-opacity-75" v-if="tradesData.length">
        <tr v-for="(item) in tradesData" :key="item.id">
          <td class="border-start border-dark" :class="[item.orderType === 'test' ? (item.position === 'long' ? 'text-secondary bg-success bg-opacity-10' : 'text-secondary bg-danger bg-opacity-10') : (item.position === 'long' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger text-opacity-75')]">
            <i v-if="item.status === 'open'" class="bi bi-file-earmark-check"></i>
            <i v-if="item.status === 'closed'" class="bi bi-file-earmark-excel"></i>
            </td>
          <td class="text-end border-end border-dark" :class="[item.position === 'long' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger text-opacity-75']">
            <router-link :to="{ name: 'OPMTradePage', params: {id: ''+item.id+''}}" :class="[item.position === 'long' ? 'text-success' : 'text-danger']">{{item.per ? item.per : '&nbsp;&nbsp;&nbsp;'}}</router-link>
          </td>
          <td v-if="tradeSetup.average.visible" class="text-end border-end border-dark">{{item.x}}</td>
          <td v-if="tradeSetup.priceIn?.visible" class="text-end border-end border-dark">{{item.priceIn}}</td>
          <td v-if="tradeSetup.mL?.visible" class="text-end border-end border-dark">{{item.mL}}</td>
          <td v-if="tradeSetup.stopLoss?.visible" class="text-end border-end border-dark">{{item.stopLoss}}</td>
          <td v-if="tradeSetup.takeProfit?.visible" class="text-end border-end border-dark">{{item.takeProfit}}</td>
          <td v-if="tradeSetup.priceClose?.visible" class="text-end border-end border-dark">{{item.priceClose}}</td>
          <td v-if="tradeSetup.risk?.visible" class="text-end border-end border-dark" :class="[item.calcRisk < 0 ? 'bg-danger bg-opacity-10 text-danger text-opacity-75' : 'bg-success bg-opacity-10 text-success']">{{item.calcRisk?.toFixed(2)}}</td>
          <td v-if="tradeSetup.rf?.visible" class="text-end border-end border-dark">{{item.calcRF?.toFixed(2)}}</td>
          <td v-if="tradeSetup.lM?.visible" class="text-end border-end border-dark">{{item.lM}}</td>
          <td v-if="tradeSetup.rrr?.visible" class="text-end border-end border-dark">{{item.calcRrr}}</td>
          <td v-if="tradeSetup.r?.visible" class="text-end border-end border-dark" :class="[item.calcR < 0 ? 'bg-danger bg-opacity-10 text-danger text-opacity-75' : item.calcR === 0 ? 'bg-warning bg-opacity-10 text-warning' : 'bg-success bg-opacity-10 text-success']">{{item.calcR?.toFixed(2)}}%</td>
          <td v-if="tradeSetup.r2?.visible" class="text-end border-end border-dark" :class="[item.calcR2 < 0 ? 'bg-danger bg-opacity-10 text-danger text-opacity-75' : item.calcR2 === 0 ? 'bg-warning bg-opacity-10 text-warning' : 'bg-success bg-opacity-10 text-success']">{{item.calcR2?.toFixed(2)}}%</td>
          <td v-if="tradeSetup.return?.visible" class="text-end border-end border-dark" :class="[item.calcReturn < 0 ? 'bg-danger bg-opacity-10 text-danger text-opacity-75' : item.calcReturn === 0 ? 'bg-warning bg-opacity-10 text-warning' : 'bg-success bg-opacity-10 text-success']">{{item.calcReturn?.toFixed(2)}}%</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="15" class="text-white text-opacity-25 p-2">
            - Create a trade <router-link :to="{ name: 'OPMTradePage' }" class="text-warning text-decoration-none">here</router-link>
            <br/>
            - More information about <Icon name="BarChartFill"  /> myTrades <router-link :to="{ name: 'AboutPage' }" class="text-warning text-decoration-none">here</router-link>.
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-secondary text-opacity-75">
      <small>
        Trade: <div class="d-inline"><i class="bi bi-file-earmark-check"></i> active</div> or
        <div class="d-inline"><i class="bi bi-file-earmark-excel"></i> closed</div>&nbsp; (no color is test)
      </small>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import apiTrade from '@/services/trade'
import Icon from '@/components/Icon'
import calcOPM from '@/utils/calcOPM'

export default {
  name: 'OPMTradeListPage',
  components: {
    Icon
  },
  props: { message: String},
  beforeEnter(_, from){
    if(from.name !== 'tradePage') {
      const store = useStore()
      store.commit('setMessage', {})
    }
  },
  setup () {
    const store           = useStore()
    const trades          = ref([])
    const filterIsTest    = ref(true)
    const filterStatus    = ref('all')
    const tradeSetup      = ref({})
    const { calcTotals }  = calcOPM(trades)
    const totalTrades     = calcTotals
    store.commit('setTitle', 'Trades OPM')

    onMounted(async () => {
      apiTrade.getList().then(resultTrades => {
        resultTrades.isVisible = true
        trades.value = resultTrades
      })
      await store.dispatch('loadTradeSetupOPM')
      tradeSetup.value = store.state.tradeSetupOPM.columns
    })

    const filterData = (isCheck) => {

      if(isCheck === true) filterIsTest.value = !filterIsTest.value

      apiTrade.getList().then(result => {

          trades.value = result.filter(trade => {

            if(filterIsTest.value) {
              if(filterStatus.value === "all") return  true
              else return filterStatus.value === trade.status
            }

            if(filterStatus.value === "all")    return trade.orderType !== 'test'
            if(filterStatus.value === "closed") return trade.status === 'closed' && trade.orderType !== 'test'
            if(filterStatus.value === "open")   return trade.status === 'open' && trade.orderType !== 'test'
        })
      })
    }

    const tradesData = computed(() => trades.value )

    return {
      tradesData,
      totalTrades,
      filterData,
      filterIsTest,
      filterStatus,
      tradeSetup
    }
  }
}
</script>
