<template>
  <form v-if="!isLoading" class="my-2">
    <!-- #### ROW 1 - PER, POSITION #### -->
    <div class="row">
      <div class="col-12 col-md-3">
        <div class="form-floating mb-2">
          <input type="text" v-model="trade.per" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" id="inputPER" placeholder="BTC">
          <label for="inputPER" class="text-warning">Crypto/Token</label>
        </div>
      </div>
      <div class="col-12 col-md-3 mb-2">
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
    </div>
    <!-- #### ROW 2 - LEVERAGE, ENTRY PRICE, M/L #### -->
    <div class="row">
      <div class="col-12 col-md-3">
        <div class="form-floating mb-2">
          <input type="number" v-model="trade.x" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" id="inputX" placeholder="8">
          <label for="inputX" class="text-warning">Leverage (X)</label>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="form-floating mb-2">
          <input type="number" v-model="trade.priceIn" class="form-control text-uppercase form-control-sm bg-dark text-white border-0 shadow-none" step="0.000000000001" id="inputPriceIn" placeholder="0.0001">
          <label for="inputPriceIn" class="text-warning">Entry Price</label>
        </div>
      </div>
      <div class="col-12 col-md-3 mb-2">
        <label class="text-muted" for="inputML">M/L</label><br/>
        <div class="form-check form-check-inline">
          <input v-model="trade.mL" class="form-check-input shadow-none" value="MARKET" type="radio" name="flexRadioDefault2" id="flexRadioDefault3" checked>
          <label class="form-check-label text-muted" for="flexRadioDefault3">Market (*)</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="trade.mL" class="form-check-input shadow-none" value="LIMIT" type="radio" name="flexRadioDefault2" id="flexRadioDefault4">
          <label class="form-check-label text-muted" for="flexRadioDefault4">Limit (*)</label>
        </div>
      </div>
    </div>
    <!-- #### ROW 3 - STOP LOSS, TAKE PROFIT, CLOSE PRICE, L/M #### -->
    <div class="row">
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
      <div class="col-12 col-md-3 mb-2">
        <label class="text-muted" for="inputLM">L/M</label><br/>
        <div class="form-check form-check-inline">
          <input v-model="trade.lM" class="form-check-input shadow-none" value="MARKET" type="radio" name="flexRadioDefault3" id="flexRadioDefault5" checked>
          <label class="form-check-label text-muted" for="flexRadioDefault5">Market (*)</label>
        </div>
        <div class="form-check form-check-inline">
          <input v-model="trade.lM" class="form-check-input shadow-none" value="LIMIT" type="radio" name="flexRadioDefault3" id="flexRadioDefault6">
          <label class="form-check-label text-muted" for="flexRadioDefault6">Limit (*)</label>
        </div>
      </div>
    </div>
    <!-- #### ROW 4 - CREATE BY USER, CREATE AT #### -->
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
        <span class="text-center px-1 py-0" :class="[calcReturn < 0 ? 'text-danger text-opacity-75' : 'text-success']"><strong>%calcReturn</strong> {{calcReturn.toFixed(2)}}%</span>
        <span class="text-center px-1 py-0" :class="[calcR < 0 ? 'text-danger text-opacity-75' : 'text-success']"><strong>%calcR</strong> {{calcR.toFixed(2)}}%</span>
        <span class="text-center px-1 py-0" :class="[calcRisk < 0 ? 'text-danger text-opacity-75' : 'text-success']"><strong>Risk</strong> {{calcRisk.toFixed(2)}}%</span>
        <span class="text-center px-1 py-0 text-muted"><strong>RF</strong> {{calcRF.toFixed(2)}}</span>
        <span class="text-center px-1 py-0" :class="[calcRrr < 0 ? 'text-danger text-opacity-75' : calcRrr === 0 ? 'text-warning' : 'text-success']"><strong>calcRrr</strong> {{calcRrr}}%</span>
        <span class="text-center px-1 py-0" :class="[calcR2 < 0 ? 'text-danger text-opacity-75' : 'text-success']"><strong>calcR2</strong> {{calcR2.toFixed(2)}}</span>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import apiTrade from '@/services/trade'
import common from '@/utils/common'
import calcOPM from '@/utils/calcOPM'
import usePage from '@/composables/usePage'

export default {
    name: 'OPMTradePage',
    props: { id: String },
    emits: [],
    setup() {
      const classCommon   = "form-control form-control-sm bg-dark text-white border-0"
      const router        = useRouter()
      const route         = useRoute()
      const isNewTrade    = (route.params.id === undefined)
      const page          = usePage({ title: (isNewTrade ? 'New Trade OPM' : 'Trade OPM #' + route.params.id)}) 
      const buttonsDisplay= ref(true)

      // Trade: default data
      const trade = ref({
        id            : isNewTrade ? 0 : route.params.id,
        per           : '',
        position      : 'short',
        x             : 1,
        priceIn       : 0,
        mL            : 'MARKET',
        stopLoss      : 0,
        takeProfit    : 0,
        priceClose    : 0,
        calcRisk      : 0,
        calcRF        : 0,
        lM            : 'MARKET',
        calcRrr       : 0,
        calcR         : 0,
        calcR2        : 0,
        calcReturn    : 0,
        createdByUser : common.getTimeToFormat((new Date).getTime()),
        orderType     : 'test',
        createdAt     : (new Date).getTime(),
        status        : 'open'
      })

      const { calcR, calcR2, calcRrr, calcRF, calcRisk, calcReturn } = calcOPM(trade)

      const saveTrade = (type) => {
        trade.value.createdByUser = Date.parse(trade.value.createdByUser) 
        trade.value.orderType     = type === undefined ? trade.value.orderType : type
        trade.value.status        = trade.value.priceClose !== '' ? 'closed' : 'open'
        trade.value.calcReturn    = calcReturn
        trade.value.calcR         = calcR
        trade.value.calcR2        = calcR2
        trade.value.calcRrr       = calcRrr
        trade.value.calcRF        = calcRF
        trade.value.calcRisk      = calcRisk

        apiTrade.save({...trade.value})
        page.setMessage({ value: '¡trade saved!', type: 'success'})
        router.push({ name: 'OPMTradeListPage'})
      }

      const removeTrade = () => {
        apiTrade.remove(trade.value)
        page.setMessage({ value: '¡trade removed!', type: 'success'})
        router.push({ name: 'OPMTradeListPage'})
      }

      onMounted(() => {
        if(!isNewTrade) {
          apiTrade.get(route.params.id).then(t => {
            t.createdByUser = common.getTimeToFormat(t.createdByUser)
            t.createdAt     = common.getTimeToFormat(t.createdAt)
            trade.value     = t
            setTimeout(function() { page.isLoading.value = false }, 200)
          }).catch(() => router.push({ name: 'OPMTradeListPage', params: {message: 'Err!'}}))
        } else {
          page.isLoading.value = false
        }
      })

      return {
          buttonsDisplay,
          classCommon,
          trade,
          calcReturn,
          calcR,
          calcR2,
          calcRrr,
          calcRF,
          calcRisk,
          isNewTrade,
          isLoading : page.isLoading,
          saveTrade,
          removeTrade,
          common
      }
    }
}
</script>