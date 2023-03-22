<template>
  <form v-if="!isLoading" class="my-2">
    <!-- #### ROW 1 - PER, POSITION, RELIABILITY #### -->
    <div class="row">
      <div class="col-12 col-md-3">
        <div class="form-floating mb-2">
          <input type="text" v-model="trade.per" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" id="inputPER" placeholder="BANDBTC">
          <label for="inputPER" class="text-warning">PER</label>
        </div>
      </div>
      <div class="col-6 col-md-3 mb-2">
        <label class="text-muted" for="Position">Position</label><br/>
        <div class="form-check form-check-inline">
          <input v-model="trade.position" class="form-check-input shadow-none" value="short" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
          <label class="form-check-label text-muted border-bottom border-danger border-1" for="flexRadioDefault1">Short</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="trade.position" class="form-check-input shadow-none" value="long" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
          <label class="form-check-label text-muted border-bottom border-success border-1" for="flexRadioDefault2">Long</label>
        </div>
      </div>
      <div class="col-6 col-md-6">
        <label class="text-muted">Reliability <span class="text-warning">{{reliability}}</span></label>
        <input type="range" v-model="trade.reliability" class="form-range shadow-none" min="1" max="10" step="0.5">
      </div>
    </div>
    <!-- #### ROW 2 - STAKE, TEMPORALITY, LEVERAGE #### -->
    <div class="row">
      <div class="col-12 col-md-3">
        <div class="form-floating mb-2">
          <input type="number" v-model="trade.stakeAmount" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" id="inputStakeAmount" placeholder="100">
          <label for="inputStakeAmount" class="text-warning">Stake</label>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="form-floating mb-2">
          <input type="text" v-model="trade.temporality" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" id="inputT" placeholder="15M">
          <label for="inputT" class="text-warning">Temporality (T)</label>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="form-floating mb-2">
          <input type="number" v-model="trade.x" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" id="inputX" placeholder="8">
          <label for="inputX" class="text-warning">Leverage (X)</label>
        </div>
      </div>
    </div>
    <!-- #### ROW 3 - ENTRY PRICE, STOP LOSS, TAKE PROFIT, CLOSE PRICE #### -->
    <div class="row">
      <div class="col-12 col-md-3">
        <div class="form-floating mb-2">
          <input type="number" v-model="trade.priceIn" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" step="0.000000000001" id="inputPriceIn" placeholder="0.0001">
          <label for="inputPriceIn" class="text-warning">Entry Price</label>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="form-floating mb-2">
          <input type="number" v-model="trade.stopLoss" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" step="0.000000000001" id="inputStopLoss" placeholder="0.0001">
          <label for="inputStopLoss" class="text-warning">Stop Loss</label>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="form-floating mb-2">
          <input type="number" v-model="trade.takeProfit" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" step="0.000000000001" id="inputTakeProfit" placeholder="0.0001">
          <label for="inputTakeProfit" class="text-warning">Take Profit</label>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="form-floating mb-2">
          <input type="number" v-model="trade.priceClose" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" step="0.000000000001" id="inputPriceClose" placeholder="0.0001">
          <label for="inputPriceClose" class="text-warning">Close Price</label>
        </div>
      </div>
    </div>
    <!-- #### ROW 4 - FEE IN, FEE OUT #### -->
    <div class="row">
      <div class="col-6 col-md-3">
        <div class="form-floating mb-2">
          <input type="number" v-model="trade.feeIn" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" step="0.000000000001" id="inputFeeIn" placeholder="-0.0001">
          <label for="inputFeeIn" class="text-warning">Fee IN</label>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <div class="form-floating mb-2">
          <input type="number" v-model="trade.feeOut" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" step="0.000000000001" id="inputFeeOut" placeholder="-0.0001">
          <label for="inputFeeOut" class="text-warning">Fee OUT</label>
        </div>
      </div>
    </div>
    <!-- #### ROW 5 - CREATE BY USER, CREATE AT #### -->
    <div class="row">
      <div class="col-6 col-md-3">
        <div class="form-floating mb-2">
          <input type="text" v-model="trade.createdByUser" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" id="inputCreatedByUser" placeholder="31/10/2008 01:02:03">
          <label for="inputCreatedByUser" class="text-warning">Created by User</label>
        </div>
      </div>
      <div class="col-6 col-md-3" v-if="!isNewTrade">
        <div class="form-floating mb-2">
          <input type="text" v-model="trade.createdAt" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" id="inputCreatedAt" placeholder="" readonly>
          <label for="inputCreatedAt" class="text-warning">Created At (readonly)</label>
        </div>
      </div>
    </div>
    <!-- #### ROW 5 - BUTTONS (HIDE DEFAULT) #### -->
    <div class="row m-0 mb-2" :class="{ 'd-none': buttonsDisplay }">
      <div class="col-12 p-0 text-muted text-end" v-if="isNewTrade">
        <hr class="border border-2 border-dark" />
        <button class="btn btn-warning" @click.prevent="saveTrade('')">Create</button> or <button class="btn btn-dark " @click.prevent="saveTrade('test')">Create as Test</button>
        &nbsp;<button class="btn btn-dark" @click.prevent="buttonsDisplay = true">X</button>
      </div>
      <div class="col-12 p-0 text-muted text-end" v-else>
        <hr class="border border-2 border-dark" />
        <button class="btn btn-warning" @click.prevent="saveTrade()">Save</button> or <button class="btn btn-danger" @click.prevent="removeTrade()">Delete</button>
        &nbsp;<button class="btn btn-dark" @click.prevent="buttonsDisplay = true">X</button>
      </div>
    </div>
    <div class="row" :class="{ 'd-none': !buttonsDisplay }"><div class="col-12 p-4"></div></div>
  </form>
  <div v-else class="text-white">
    <div class="d-flex justify-content-center">
      <div class="spinner-border m-5 text-warning" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
  <!-- #### FOOTER NAV - TOTALS ##### --> 
  <nav class="navbar fixed-bottom bg-dark bg-opacity-75 py-2 px-1" :class="{ 'd-none': !buttonsDisplay }">
    <div class="container-fluid justify-content-end">
        <span class="text-center px-1 py-0" :class="[calcWin < 0 ? 'text-danger text-opacity-75' : 'text-success']"><strong>%Win</strong> {{calcWin.toFixed(2)}}%</span>
        <span class="text-center px-1 py-0" :class="[calcLose < 0 ? 'text-danger text-opacity-75' : 'text-success']"><strong>%Lose</strong> {{calcLose.toFixed(2)}}%</span>
        <span class="text-center px-1 py-0" :class="[calcRisk < 0 ? 'text-danger text-opacity-75' : 'text-success']"><strong>Risk</strong> {{calcRisk.toFixed(2)}}%</span>
        <span class="text-center px-1 py-0 text-muted"><strong>RF</strong> {{calcRF.toFixed(2)}}</span>
        <span class="text-center px-1 py-0" :class="[calcProfit < 0 ? 'text-danger text-opacity-75' : calcProfit === 0 ? 'text-warning' : 'text-success']"><strong>Profit</strong> {{calcProfit.toFixed(2)}}%</span>
        <span class="text-center px-1 py-0" :class="[calcResult < 0 ? 'text-danger text-opacity-75' : 'text-success']"><strong>Result</strong> {{calcResult.toFixed(2)}}</span>
        <span class="text-center px-1 py-0" :class="[calcNet < trade.stakeAmount ? 'text-danger text-opacity-75' : 'text-success']"><strong>Net</strong> {{calcNet.toFixed(2)}}</span>
        <div class="row m-0 mt-2 px-2">
          <div class="col-12 p-0 text-muted text-end" v-if="isNewTrade">
            <button class="btn btn-warning" @click.prevent="saveTrade('')">Create</button> or
            <button class="btn btn-dark border border-warning" @click.prevent="saveTrade('test')">Create as test</button>
            &nbsp;<button class="btn btn-dark" @click.prevent="buttonsDisplay = false">X</button>
          </div>
          <div class="col-12 p-0 text-muted text-end" v-else>
            <button class="btn btn-warning" @click.prevent="saveTrade()">Save</button> or <button class="btn btn-danger" @click.prevent="removeTrade()">Delete</button>
            &nbsp;<button class="btn btn-dark" @click.prevent="buttonsDisplay = false">X</button>
          </div>
        </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiTrade from '@/services/trade'
import common from '@/utils/common'
import calcOPF from '@/utils/calcOPF'
import usePage from '@/composables/usePage'

export default {
    name: 'TradePage',
    props: { id: String },
    emits: [],
    setup() {
      const classCommon = "form-control form-control-sm bg-dark text-white border-0"
      const router      = useRouter()
      const route       = useRoute()
      const isNewTrade  = (route.params.id === undefined)
      const page        = usePage({
        title: (isNewTrade ? 'New Trade OPF' : 'Trade OPF #' + route.params.id)
      }) 
      const buttonsDisplay = ref(true)

      // Trade: default data
      const trade = ref({
        id            : isNewTrade ? 0 : route.params.id,
        per           : 'BANDBTC',
        position      : 'short',
        reliability   : 1,
        stakeAmount   : 100,
        temporality   : '15M',
        x             : 1,
        priceIn       : 0.0001392,
        stopLoss      : 0.0001409,
        takeProfit    : 0.0001314,
        priceClose    : 0.0001314,
        feeIn         : 0.0006,
        feeOut        : 0.0006,
        orderType     : 'test',
        calcWin       : 0,
        calcLose      : 0,
        calcRF        : 0,
        calcRisk      : 0,
        calcProfit    : 0,
        calcResult    : 0,
        calcNet       : 0,
        createdByUser : common.getTimeToFormat((new Date).getTime()), 
        createdAt     : (new Date).getTime(),
        status        : 'open'
      })

      const { calcWin, calcLose, calcRisk, calcRF, calcProfit, calcResult, calcNet } = calcOPF(trade)
      
      const reliability = computed(() => {
        return trade.value.reliability
      })

      // Trade: Save
      const saveTrade = (type) => {
        trade.value.createdByUser = Date.parse(trade.value.createdByUser) 
        trade.value.orderType   = type === undefined ? trade.value.orderType : type
        trade.value.status      = trade.value.priceClose !== '' ? 'closed' : 'open'
        trade.value.calcWin     = calcWin
        trade.value.calcLose    = calcLose
        trade.value.calcRisk    = calcRisk
        trade.value.calcRF      = calcRF
        trade.value.calcProfit  = calcProfit
        trade.value.calcResult  = calcResult
        trade.value.calcNet     = calcNet
        apiTrade.save({...trade.value})
        page.setMessage({ value: '¡trade saved!', type: 'success'})
        router.push({ name: 'OPFTradeListPage'})
      }

      const removeTrade = () => {
        apiTrade.remove(trade.value)
        page.setMessage({ value: '¡trade removed!', type: 'success'})
        router.push({ name: 'OPFTradeListPage'})
      }

      onMounted(() => {
        if(!isNewTrade) {
          apiTrade.get(route.params.id).then(t => {
            t.createdByUser = common.getTimeToFormat(t.createdByUser)
            t.createdAt = common.getTimeToFormat(t.createdAt)
            trade.value = t
            setTimeout(function(){
              page.isLoading.value = false
            }, 200)
          }).catch(() => router.push({ name: 'OPMTradeListPage', params: {message: 'Err!'}}))
        } else {
          page.isLoading.value = false
        }
      })

      return {
          buttonsDisplay,
          classCommon,
          trade,
          calcWin,
          calcLose,
          calcRisk,
          calcRF,
          calcProfit,
          calcResult,
          calcNet,
          reliability,
          isNewTrade,
          isLoading : page.isLoading,
          saveTrade,
          removeTrade,
          common
      }
    }
}
</script>