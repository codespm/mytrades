<template>
  <div class="card-title text-start pt-2">
    <router-link :to="{ name: 'OPFTradePage' }" class="btn btn-sm btn-outline-warning m-1 border-0" type="submit"><i class="bi bi-plus-circle-fill"></i> New</router-link>
    <router-link :to="{ name: 'OPFTradeListDataPage' }" class="btn btn-sm btn-outline-warning m-1 border-0" type="submit"><i class="bi bi-archive"></i> Data</router-link>
    <router-link :to="{ name: 'OPFTradeListSetupPage' }" class="btn btn-sm btn-outline-warning m-1 border-0" type="submit"><i class="bi bi-gear"></i> Setup</router-link>
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
      <div class="col-12 col-sm-10 text-end mb-2 d-flex justify-content-end">
        <span class="bg-success bg-opacity-10 px-1 text-success border-bottom border-success" title="Good: Cantidad de trades que cerraron en profit." onclick="alert(this.title);">
          <small><span class="d-none d-sm-inline">Good</span> {{totalTrades.good}}</small>
        </span>
        <span class="bg-warning bg-opacity-10 px-1 text-warning border-bottom border-warning px-1 mx-2" title="Break: El break-even (salir neutro sin ganancias ni pérdidas) lo ingresamos manualmente reemplazando el % de la columna profit por 0." onclick="alert(this.title);">
          <small><span class="d-none d-sm-inline">Break</span> {{totalTrades.break}}</small>
        </span>
        <span class="bg-danger bg-opacity-10 px-1 text-danger border-bottom border-danger px-1" title="Bad: Cantidad de trades que cerraron en perdidas." onclick="alert(this.title);">
          <small><span class="d-none d-sm-inline">Bad</span> {{totalTrades.bad}}</small>
        </span>
        <span class="bg-secondary bg-opacity-10 px-1 text-white text-opacity-50 border-bottom border-secondary px-1 mx-2" title="ROI: Retorno total de todos los trades que llevan haciendo." onclick="alert(this.title);">
          <small><span class="d-none d-sm-inline">ROI</span> {{totalTrades.roi.toFixed(2)}}%</small>
        </span>
        <span class="bg-secondary bg-opacity-10 px-1 text-white text-opacity-50 border-bottom border-secondary px-1" title="Stake: Cantidad de dinero por trade, asumiendo que es fijo." onclick="alert(this.title);">
          <small><span class="d-none d-sm-inline">Stake</span> {{totalTrades.stakeAmount}}</small>
        </span>
        <span class="bg-secondary bg-opacity-10 px-1 text-white text-opacity-50 border-bottom border-secondary px-1 mx-2" title="AGV TP: Retorno promedio de mis trades en profit." onclick="alert(this.title);">
          <small><span class="d-none d-sm-inline">AVG TP</span> {{totalTrades.avgTP.toFixed(2)}}%</small>
        </span>
        <span class="bg-secondary bg-opacity-10 px-1 text-white text-opacity-50 border-bottom border-secondary" title="AVG SL: Pérdida promedio de mis trades con salto de stop loss." onclick="alert(this.title);">
          <small><span class="d-none d-sm-inline">AVG SL</span> {{totalTrades.avgSL.toFixed(2)}}%</small>
        </span>
      </div>
    </div>
  </div>
  <div class="table-responsive pb-2">
    <table class="table table-sm table-hover w-100 my-2 border-dark bg-dark bg-opacity-50" style="width:1600px;">
      <thead class="table text-center bg-dark bg-opacity-75 text-white text-opacity-75 border-dark">
        <tr>
          <td class="border-start border-1 border-dark"></td>
          <td><small>PER</small></td>
          <td v-if="tradeSetup.stakeAmount?.visible"><small>SA</small></td>
          <td v-if="tradeSetup.temporality?.visible"><small>T</small></td>
          <td v-if="tradeSetup.average?.visible"><small>X</small></td>
          <td v-if="tradeSetup.priceIn?.visible"><small>EP</small></td>
          <td v-if="tradeSetup.stopLoss?.visible"><small>SL</small></td>
          <td v-if="tradeSetup.takeProfit?.visible"><small>TP</small></td>
          <td v-if="tradeSetup.priceClose?.visible"><small>CP</small></td>
          <td v-if="tradeSetup.feeIn?.visible"><small>FI</small></td>
          <td v-if="tradeSetup.feeOut?.visible"><small>FO</small></td>
          <td v-if="tradeSetup.risk?.visible"><small>Risk</small></td>
          <td v-if="tradeSetup.rf?.visible"><small>RF</small></td>
          <td v-if="tradeSetup.win?.visible"><small>%W</small></td>
          <td v-if="tradeSetup.lose?.visible"><small>%L</small></td>
          <td v-if="tradeSetup.profit?.visible"><small>Profit</small></td>
          <td v-if="tradeSetup.result?.visible"><small>Result</small></td>
          <td v-if="tradeSetup.net?.visible" class="border-end border-1 border-dark"><small>Net</small></td>
        </tr>
      </thead>
      <tbody class="text-white text-opacity-75" v-if="tradesData.length">
        <tr v-for="(item) in tradesData" :key="item.id">
          <td class="border-start border-dark" :class="[item.orderType === 'test' ? (item.position === 'long' ? 'text-secondary bg-success bg-opacity-10' : 'text-secondary bg-danger bg-opacity-10') : (item.position === 'long' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger text-opacity-75')]"><i v-if="item.status === 'open'" class="bi bi-file-earmark-check"></i><i v-if="item.status === 'closed'" class="bi bi-file-earmark-excel"></i></td>
          <td class="text-end border-end border-dark" :class="[item.position === 'long' ? 'bg-success bg-opacity-10 text-success' : 'bg-danger bg-opacity-10 text-danger text-opacity-75']">
            <router-link :to="{ name: 'OPFTradePage', params: {id: ''+item.id+''}}" :class="[item.position === 'long' ? 'text-success' : 'text-danger']">{{item.per ? item.per : '&nbsp;&nbsp;&nbsp;'}}</router-link>
          </td>
          <td v-if="tradeSetup.stakeAmount.visible" class="border-end border-dark text-end">{{item.stakeAmount}}</td>
          <td v-if="tradeSetup.temporality.visible" class="border-end border-dark">{{item.temporality}}</td>
          <td v-if="tradeSetup.average.visible" class="text-end border-end border-dark">{{item.x}}</td>
          <td v-if="tradeSetup.priceIn?.visible" class="text-end border-end border-dark">{{item.priceIn}}</td>
          <td v-if="tradeSetup.stopLoss?.visible" class="text-end border-end border-dark">{{item.stopLoss}}</td>
          <td v-if="tradeSetup.takeProfit?.visible" class="text-end border-end border-dark">{{item.takeProfit}}</td>
          <td v-if="tradeSetup.priceClose?.visible" class="text-end border-end border-dark">{{item.priceClose}}</td>
          <td v-if="tradeSetup.feeIn?.visible" class="text-end border-end border-dark">{{item.feeIn}}</td>
          <td v-if="tradeSetup.feeOut?.visible" class="text-end border-end border-dark">{{item.feeOut}}</td>
          <td v-if="tradeSetup.risk?.visible" class="text-end border-end border-dark" :class="[item.calcRisk < 0 ? 'bg-danger bg-opacity-10 text-danger text-opacity-75' : 'bg-success bg-opacity-10 text-success']">{{item.calcRisk.toFixed(2)}}</td>
          <td v-if="tradeSetup.rf?.visible" class="text-end border-end border-dark">{{item.calcRF?.toFixed(2)}}</td>
          <td v-if="tradeSetup.win?.visible" class="text-end border-end border-dark" :class="[item.calcWin < 0 ? 'bg-danger bg-opacity-10 text-danger text-opacity-75' : 'bg-success bg-opacity-10 text-success']">{{item.calcWin.toFixed(2)}}%</td>
          <td v-if="tradeSetup.lose?.visible" class="text-end border-end border-dark" :class="[item.calcLose < 0 ? 'bg-danger bg-opacity-10 text-danger text-opacity-75' : 'bg-success bg-opacity-10 text-success']">{{item.calcLose.toFixed(2)}}%</td>
          <td v-if="tradeSetup.profit?.visible" class="text-end border-end border-dark" :class="[item.calcProfit < 0 ? 'bg-danger bg-opacity-10 text-danger text-opacity-75' : item.calcProfit === 0 ? 'bg-warning bg-opacity-10 text-warning' : 'bg-success bg-opacity-10 text-success']">{{item.calcProfit.toFixed(2)}}%</td>
          <td v-if="tradeSetup.result?.visible" class="text-end border-end border-dark">{{item.calcResult.toFixed(2)}}</td>
          <td v-if="tradeSetup.net?.visible" class="text-end border-end border-dark">{{item.calcNet.toFixed(2)}}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="18" class="text-white text-opacity-25 p-2">
            - Create a trade <router-link :to="{ name: 'OPFTradePage' }" class="text-warning text-decoration-none">here</router-link>
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

export default {
  name: 'TradeListPage',
  components: {
    Icon
  },
  props: { message: String},
  beforeEnter(_, from){
    if(from.name !== 'OPFTradePage') {
      const store = useStore()
      store.commit('setMessage', {})
    }
  },
  setup () {
    const store         = useStore()
    const trades        = ref([])
    const filterIsTest  = ref(true)
    const filterStatus  = ref('all')
    const tradeSetup    = ref({})

    store.commit('setTitle', 'Trades OPF')

    onMounted(async () => {
      apiTrade.getList().then(resultTrades => {
        resultTrades.isVisible = true
        trades.value = resultTrades
      })
      await store.dispatch('loadTradeSetupOPF')
      tradeSetup.value = store.state.tradeSetupOPF.columns
    })

    let totalTrades = computed(() => {
      
      let good        = 0
      let empty       = 0
      let bad         = 0
      let stakeAmount = 0
      let roi         = 0
      let result      = 0
      let avgTP       = 0
      let avgTPCount  = 1
      let avgSL       = 0
      let avgSLCount  = 1

      trades.value.forEach( trade => {

        if(trade.calcProfit > 0)    good++
        if(trade.calcProfit === 0)  empty++
        if(trade.calcProfit < 0)    bad++

        stakeAmount = stakeAmount + (trade.stakeAmount === "" ? 0 : parseFloat(trade.stakeAmount))
        result      = result + (trade.calcResult === "" ? 0 : parseFloat(trade.calcResult))

        if(parseFloat(trade.calcProfit) > 0) {
          avgTP += parseFloat(trade.calcProfit)
          avgTPCount++
        } else {
          if(parseFloat(trade.calcProfit) !== 0) {
            avgSL += parseFloat(trade.calcProfit)
            avgSLCount++
          }
        }

      })

      if(trades.value.length === 0) {
        stakeAmount = 0
        roi = 0
      } else {
        stakeAmount = stakeAmount === 0 ? 1 : stakeAmount
        roi = ((((stakeAmount + result) - (stakeAmount)) / stakeAmount))* 100
      }

      avgTP = avgTP/avgTPCount
      avgSL = avgSL/avgSLCount

      return {
        good,
        break: empty,
        bad,
        stakeAmount,
        roi,
        avgTP,
        avgSL
      }
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
