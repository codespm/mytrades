/*

RdP = Registro de posiciones

B   ;C      ;D          ;E;F        ;G  ;H          ;I          ;J      ;K  ;L      ;M  ;N  ;O  ;P  ;Q
DIA ;MONEDA ;POSICION   ;X;ENTRADA  ;M/L;STOP_LOSS  ;TAKE_PROFIT;SALIDA;RISK;REWARD ;L/M;RRR;R  ;R2 ;RETORNO

OCULTOS POR DEFAULT

- RISK (K)      = =IF(AND('RdP'!$F3>0;'RdP'!$H3>0);'RdP'!$F3-'RdP'!$H3;0)
- REWARD (L)    = =IF(AND('RdP'!$I3>0;'RdP'!$F3>0);'RdP'!$I3-'RdP'!$F3;0)
- R (O)         = =IF('RdP'!$D3="LONG";(('RdP'!$J3-'RdP'!$F3)/'RdP'!$F3)*'RdP'!$E3; (('RdP'!$F3-'RdP'!$J3)/'RdP'!$J3)*'RdP'!$E3)
- R2 (P)        = =IF('RdP'!$G$3:$G$7="MARKET (*)";IF('RdP'!$F3='RdP'!$J3;-0,225%*'RdP'!$E3;'RdP'!$O3-'RdP'!$O3*(0,225%*'RdP'!$E3));(IF('RdP'!$F3='RdP'!$J3;0,025%;'RdP'!$O3+'RdP'!$O3*(0,025%*'RdP'!$E3))))

RRR     = =IF(AND('RdP'!$K3<>0;'RdP'!$L3<>0);(SUBSTITUTE(TEXT('RdP'!$K3/'RdP'!$L3;"?/?");"/";":"));"REVISAR")
RETORNO = =IF(AND('RdP'!$D$3:$D$7<>0;'RdP'!$F$3:$F$7<>0;'RdP'!$G$3:$G$7<>0;'RdP'!$H$3:$H$7<>0;'RdP'!$I$3:$I$7<>0;'RdP'!$J$3:$J$7<>0;'RdP'!$M3<>0);IF('RdP'!$M$3:$M$7="MARKET (*)";IF('RdP'!$F3='RdP'!$J3;-0,225%*'RdP'!$E3+'RdP'!$P3;'RdP'!$P3-'RdP'!$P3*(0,225%*'RdP'!$E3));(IF('RdP'!$F3='RdP'!$J3;0,025%*'RdP'!$E3+'RdP'!$P3;'RdP'!$P3+'RdP'!$P3*(0,025%*'RdP'!$E3))));"COMPLETAR")

ESPERANZA MATEMATICA    = =IF(COUNT('RdP'!$Q$3:$Q$7)>=5;IF(AB3<>0;IF(AA3<>0;((E13*(AA3/AB3))-E14)*-1;0);E13*AA3*100);"AGREGAR TRADES")
CANTIDAD DE ACIERTOS    = =IF(SUM('RdP'!$Q$3:$Q$7)<>0;COUNTIF('RdP'!$Q$3:$Q$7;">0")/COUNT('RdP'!$Q$3:$Q$7);"REVISAR")
F DE KELLY              = =IF(AND(E12<1;E13<0,5);2%;IF(SUM('RdP'!$Q$3:$Q$7)<>0;IF(AND(NOT(E12="AGREGAR TRADES");E12>1;E13>0,5);(E13-(1-E13)/(AB4/AA4))/10/2;2%);"REVISAR"))
PROMEDIO RESULTADOS     = =IF(E13<>"REVISAR";IF(AVERAGE('RdP'!$Q$3:$Q$7)=0;"REVISAR";AVERAGE('RdP'!$Q$3:$Q$7));"REVISAR")

OTROS DATOS (E12 = Esperanza Matematica, E13 = Cantidad de aciertos, E14 = F de Kelly, E15 = Promedio Resultados)
- =IF(E12<>"AGREGAR TRADES";IF(E12<1;"(*) SISTEMA NO RENTABLE";"(*) SISTEMA RENTABLE");0)
- =IF(E13<>"REVISAR";IF(AND(E13<50%;E16<0);"(*) MAS STOP LOSS QUE TAKE PROFITS";0);0)
- =IF(E15=2%;"(*) TAMAÑO DE POSICION NEUTRAL";IF(E15>2%;"(*) POSICION AGRESIVA"))
- =IF(E12<>"AGREGAR TRADES";IF(AND(E16<0;E12<>0;IF(E13<>0;(AVERAGEIF('RdP'!$Q$3:$Q$7;">0")/-AVERAGEIF('RdP'!$Q$3:$Q$7;"<0")-1)<-20%;0);E13>=E14);"(*) ¿LEVERAGE EN PERDIDAS MUY ALTO? ¿RRR BAJO?";0);0)

Esperanza matematica: IF(AB3<>0;IF(AA3<>0;((E13*(AA3/AB3))-E14)*-1;0);E13*AA3*100);
Cantidad de aciertos se calcula: (cantidad de retorno > 0 / cantidad de retornos) * 100
F de Kelly se calcula: ((E13-(1-E13)/(AB4/AA4))/10/2) * 100
Promedio Resultados: average(retorno)

AB4 = AVERAGE(NEGATIVAS RETORNO) 
AA4 = AVERAGE(POSITIVAS RETORNO)
AA3 = SUM(POSITIVAS RETORNO) / total trades con retorno
AB3 = SUM(NEGATIVAS RETORNO) / total trades con retorno
*/

import { computed } from 'vue'
import numberToFraction from '@/utils/numberToFraction'

const calcOPM = function(data) {

    const calcR = computed(() => {
        const trade             = data
        const isPositionLong    = trade.value.position === "long"
        const priceClose        = trade.value.priceClose
        const priceIn           = trade.value.priceIn
        const xValue            = trade.value.x
        const divPriceIn        = (priceIn === 0 || priceIn === "") === 0 ? 1 : priceIn
        const divPriceClose     = (priceClose === 0 || priceClose === "") ? 1 : priceClose

        if(isPositionLong) {
            return (((priceClose - priceIn) / divPriceIn) * xValue) * 100
        }
        return (((priceIn - priceClose) / divPriceClose) * xValue) * 100

    })
 
    const calcR2 = computed(() => {
        const trade         = data
        const isMlMarket    = trade.value.mL === "MARKET"
        const isEqualPrice  = trade.value.priceIn === trade.value.priceClose
        const calcRValue    = calcR.value
        const xValue        = trade.value.x

        if(isMlMarket) {
            if(isEqualPrice) {
                return -(-0.225 * xValue)
            }
            return -((calcRValue/100) * (0.225 * xValue) - calcRValue)
        }

        if(isEqualPrice) {
            return 0.025
        }
        return (calcRValue/100 * (0.025 * xValue)) + calcRValue

    })

    const calcRF = computed(() => {
        const trade = data
        if(trade.value.takeProfit > 0 && trade.value.priceIn > 0) {
            return (trade.value.takeProfit - trade.value.priceIn)
        }
        return 0
    })

    const calcRisk = computed(() => {
        const trade = data
        if(trade.value.priceIn > 0 && trade.value.stopLoss > 0) {
            return (trade.value.priceIn - trade.value.stopLoss)
        }
        return 0
    })

    const calcRrr = computed(() => {
        const calcRiskValue = parseFloat(calcRisk.value)
        const calcRFValue   = parseFloat(calcRF.value)

        if(calcRiskValue !== 0 && calcRFValue !== 0) {
            let calcRRRF = calcRiskValue/calcRFValue
            if(calcRiskValue < 0) {
                calcRRRF = -(calcRiskValue)/calcRFValue
            }
            calcRRRF = numberToFraction(calcRRRF);
            return calcRRRF.toString().split("/").join(":")
        }

        return "REVISAR"

    })

    const calcReturn = computed(() => {
        const trade         = data
        const isLmMarket    = trade.value.lM === 'MARKET'
        const isEqualPrice  = trade.value.priceIn === trade.value.priceClose
        const calcR2Value   = calcR2.value
        const xValue        = trade.value.x

        if(isLmMarket) {
          if(isEqualPrice) {
            return -(-(-0.225 * xValue) + calcR2Value) // -0.225 * (xValue + calcR2Value)
          } 
          return -((calcR2Value/100) * (0.225 * xValue) - calcR2Value)
        }

        if(isEqualPrice) {
            return (0.025 * xValue) + calcR2Value
        }  
        return (calcR2Value/100 * (0.025 * xValue)) + calcR2Value
        
    })

    const calcTotals = computed(() => {
        let trades          = data
        let avgReturn       = 0
        let avgReturnCount  = 0
        let returnMay0      = 0
        let returnMin0      = 0
        let porcOK          = 0
        let fKelly          = 0
        let sumReturnPos    = 0
        let sumReturnNeg    = 0
        let mat             = 0
        let hasTrades       = trades.value.length > 0
        let sysRent         = ""
        let SLTP            = "" 
        let position        = "" 
        let question        = ""
        let SLPI            = ""

        if(hasTrades) {
        
            trades.value.forEach( trade => {
          
                let ret = parseFloat(trade.calcReturn)
        
                if(ret > 0) {
                  sumReturnPos += ret
                  returnMay0++
                } else {
                  sumReturnNeg += ret
                  returnMin0++
                }
        
                avgReturn += parseFloat(trade.calcReturn)
                avgReturnCount++
        
              }) 
      
              if(returnMin0 === 0) returnMin0 = 1
              if(returnMay0 === 0) returnMay0 = 1
      
              avgReturn   = avgReturn/(avgReturnCount === 0 ? 1 : avgReturnCount)
              porcOK      = (returnMay0/(avgReturnCount === 0 ? 1 : avgReturnCount)) * 100
              let AB4     = sumReturnNeg / returnMin0 
              let AA4     = sumReturnPos / returnMay0 
              let E13     = porcOK / 100
              AB4         = AB4 === 0 ? 1 : AB4
              AA4         = AA4 === 0 ? 1 : AA4
              fKelly      = ((E13-(1-E13)/(AB4/AA4))/10/2) * 100  
              let E14     = (100 - (E13 * 100)) / 100
              let AA3     = (sumReturnPos / returnMay0) * (E13 === 0 ? 1 : E13) 
              let AB3     = (sumReturnNeg / returnMin0) * (E14 === 0 ? 1 : E14) 
      
              if(AB3 !== 0) {
                if(AA3 !== 0) {
                  mat = ((E13*(AA3/AB3))-E14)*-1
                } else {
                  mat = 0
                }
              } else {
                mat = E13*AA3*100
              }
      
              sysRent   = (mat < 1)  ? "| Sistema NO Rentable" : "| Sistema Rentable"
              SLTP      = (E13<50 && porcOK<0) ? "| Mas stop loss que take profits" : ""
              position  = ((fKelly===2) ? "| Tamaño de posición neutral" : (fKelly>2 ? "| Posición Agresiva" : ""));
              question  = "| ¿Leverage en perdidas muy alto? ¿RRR bajo?";
              SLPI      = (E14 > 90) ? "| ¿stop-loss muy cercano a la entrada?" : ""
        }

        /*
            IF(
                E12<>"AGREGAR TRADES";
                IF(
                    AND(
                        E16<0;E12<>0;
                        IF(
                            E13<>0;
                            (AVERAGEIF($Q$3:$Q$7;">0")/-AVERAGEIF($Q$3:$Q$7;"<0")-1) < -20%;
                            0
                        );
                        E13>=E14
                    );
                    "(*) ¿LEVERAGE EN PERDIDAS MUY ALTO? ¿RRR BAJO?";
                    0
                );
                0
            )
        */

        return {
          avgReturn,
          porcOK, // E16
          fKelly,
          mat, // E12
          sysRent,
          SLTP,
          position,
          question,
          SLPI
        }
    })

    return {
        calcR,
        calcR2,
        calcRF,
        calcRisk,
        calcRrr,
        calcReturn,
        calcTotals
    }

}

export default calcOPM