import { createStore } from 'vuex'
import apiTrade from '@/services/trade'

export default createStore({
  state: {
    tradeOptionSelected: "",
    title: "",
    message: {
      type: "",
      value: ""
    },
    tradeData: [],
    tradeSetupOPM: {
      isLoading: true,
      columns: {
        average:      {value: 'X',      visible: true},
        priceIn:      {value: 'EP',     visible: true},
        mL:           {value: 'M/L',    visible: true},
        stopLoss:     {value: 'SL',     visible: true},
        takeProfit:   {value: 'TP',     visible: true},
        priceClose:   {value: 'CP',     visible: true},
        risk:         {value: 'Risk',   visible: true},
        rf:           {value: 'RF',     visible: true},
        lM:           {value: 'L/M',    visible: true},
        rrr:          {value: 'RRR',    visible: true},
        r: 		        {value: 'R',		  visible: true},
        r2: 		      {value: 'R2',		  visible: true},
        return: 		  {value: 'Return',	visible: true},
      }
    },
    tradeSetupOPF: {
      isLoading: true,
      columns: {
        temporality:  {value: 'T',      visible: true},
        average:      {value: 'X',      visible: true},
        priceIn:      {value: 'EP',     visible: true},
        stopLoss:     {value: 'SL',     visible: true},
        takeProfit:   {value: 'TP',     visible: true},
        priceClose:   {value: 'CP',     visible: true},
        feeIn:        {value: 'FI',     visible: true},
        feeOut:       {value: 'FO',     visible: true},
        risk:         {value: 'Risk',   visible: true},
        rf:           {value: 'RF',     visible: true},
        win:          {value: '%W',     visible: true},
        lose:         {value: '%L',     visible: true},
        profit:       {value: 'Profit', visible: true},
        result:       {value: 'Result', visible: true},
        net:          {value: 'Net',    visible: true}
      }
    }
  },
  getters: {
    getTradeOptionSelected(state) {
      if(state.tradeOptionSelected === '') return localStorage.getItem('tradeOptionSelected')
      return state.tradeOptionSelected
    }
  },
  mutations: {
    setTradeOptionSelected(state, tradeOptionSelected) {
      localStorage.setItem('tradeOptionSelected', tradeOptionSelected);
      state.tradeOptionSelected = tradeOptionSelected
    },
    setTitle(state, title) {
      state.title = title
    },
    setMessage(state, message) {
      state.message = message
    },
    setTradeSetupOPM(state, payload) {
      state.tradeSetupOPM = payload
    },
    setTradeSetupOPF(state, payload) {
      state.tradeSetupOPF = payload
    }
  },
  actions: {
    async loadTradeSetupOPM({ commit }) {
      try {
        await apiTrade.getSetupOPM().then((response) => {
          if(response) {
            delete response.id
            commit('setTradeSetupOPM', {columns: response, isLoading: false})
            console.log('loadTradeSetupOPM - ok', response)
          } else {
            console.log('empty data')
          }
        }).catch((err) => {
          console.log('actions.loadTradeSetupOPM - 3', err)
        })
      } catch(err) {
        console.log(err)
      }
    },
    async loadTradeSetupOPF({ commit }) {
      try {
        await apiTrade.getSetupOPF().then((response) => {
          if(response) {
            delete response.id
            commit('setTradeSetupOPF', {columns: response, isLoading: false})
          } else {
            console.log('empty data')
          }
        }).catch((err) => {
          console.log('actions.loadTradeSetupOPF - 3', err)
        })
      } catch(err) {
        console.log(err)
      }
    }
  },
  modules: {
  }
})
