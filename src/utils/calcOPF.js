import { computed } from 'vue'

const calcOPF = function(trade) {
    const feeTotal              = computed(() => parseFloat(trade.value.feeIn) + parseFloat(trade.value.feeOut))
    const leverage              = computed(() => parseFloat(trade.value.x))
    const priceInDivTakeProfit  = computed(() => parseFloat(trade.value.priceIn)/parseFloat(trade.value.takeProfit))
    const takeProfitDivPriceIn  = computed(() => parseFloat(trade.value.takeProfit)/parseFloat(trade.value.priceIn))
    const priceInDivStopLoss    = computed(() => parseFloat(trade.value.priceIn)/parseFloat(trade.value.stopLoss))
    const stopLossDivPriceIn    = computed(() => parseFloat(trade.value.stopLoss)/parseFloat(trade.value.priceIn))
    const priceInDivPriceClose  = computed(() => parseFloat(trade.value.priceIn)/parseFloat(trade.value.priceClose))
    const priceCloseDivPriceIn  = computed(() => parseFloat(trade.value.priceClose)/parseFloat(trade.value.priceIn))

    const calcWin = computed(() => {
      let calc = trade.value.position === 'short' 
        ? ((((priceInDivTakeProfit.value) - 1) + feeTotal.value) * leverage.value) * 100
        : ((((takeProfitDivPriceIn.value) - 1) + feeTotal.value) * leverage.value) * 100
      return isNaN(calc) ? 0 : calc;
    })

    const calcLose = computed(() => {
      let calc = trade.value.position === 'short' 
        ? ((((priceInDivStopLoss.value) - 1) + feeTotal.value) * leverage.value) * 100
        : ((((stopLossDivPriceIn.value) - 1) + feeTotal.value) * leverage.value) * 100
      return isNaN(calc) ? 0 : calc;
    })

    const calcRisk = computed(() => {
      let calc = trade.value.position === 'short' 
        ? ((((priceInDivTakeProfit.value) - 1) + feeTotal.value) * leverage.value) / -((((priceInDivStopLoss.value) - 1) + feeTotal.value) * leverage.value)
        : ((((takeProfitDivPriceIn.value) - 1) + feeTotal.value) * leverage.value) / -((((stopLossDivPriceIn.value) - 1) + feeTotal.value) * leverage.value)
      return isNaN(calc) ? 0 : calc;
    })

    const calcRF = computed(() => {
      let calc = trade.value.position === 'short' 
        ? ((((priceInDivPriceClose.value) - 1) + feeTotal.value) * leverage.value/-((((priceInDivStopLoss.value) - 1) + feeTotal.value) * leverage.value))
        : ((((priceCloseDivPriceIn.value)-1) + feeTotal.value) * leverage.value/-((((stopLossDivPriceIn.value) - 1) + feeTotal.value) * leverage.value))
       return isNaN(calc) ? 0 : calc;
    })

    const calcProfit = computed(() => {
      let calc = trade.value.position === 'short'
        ? ((((priceInDivPriceClose.value) - 1) + feeTotal.value) * leverage.value) * 100
        : ((((priceCloseDivPriceIn.value) - 1) + feeTotal.value) * leverage.value) * 100
      return isNaN(calc) ? 0 : calc; 
    })

    const calcResult = computed(() => {
      let calc = parseFloat(trade.value.stakeAmount) * (parseFloat(calcProfit.value)/100)
      return isNaN(calc) ? 0 : calc; 
    } )

    const calcNet = computed(() => {
      let calc = parseFloat(trade.value.stakeAmount) + parseFloat(calcResult.value)
      return isNaN(calc) ? 0 : calc;
    } )

    return {
        calcWin,
        calcLose,
        calcRisk,
        calcRF,
        calcProfit,
        calcResult,
        calcNet
    }
}

export default calcOPF