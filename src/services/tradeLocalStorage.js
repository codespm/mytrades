const TRADES = "trades"

export function saveTradeApi(trade) {
    const trades = getTradesApi();
    const id = (new Date()).getTime()
    if (trades.length === 0) {
      const tradeTemp = [ { id, trade, createdAt: new Date(), }, ];
      localStorage.setItem(TRADES, JSON.stringify(tradeTemp));
    } else {
      trades.push({ id, trade, createdAt: new Date(), });
      localStorage.setItem(TRADES, JSON.stringify(trades));
    }
  }
  
  export function getTradesApi() {
    const trades = localStorage.getItem(TRADES);
    if (trades) {
      return JSON.parse(trades);
    }
    return [];
  }
  
  export function deleteTradeApi(idTrade) {
    const trades = getTradesApi();
    console.log(idTrade)
    //remove(trades, function(trade) {
      //return trade.id === idTrade;
    //});
    localStorage.setItem(TRADES, JSON.stringify(trades));
  }