/**
 * Trade CRUD on indexeddb
 * Ref: https://www.raymondcamden.com/2019/10/16/using-indexedd
 */

const DB_NAME 		= 'myTradedb';
const DB_VERSION	= 1;
let DB;

/**
 * Common functions
 */

const getStore = () => {
	let tradeOptionSelected = localStorage.getItem('tradeOptionSelected');
	let dbStoreName 		= "trades_" + tradeOptionSelected;
	let dbStoreNameSetup 	= "trades_setup_" + tradeOptionSelected;
	return {
		default: dbStoreName,
		setup: dbStoreNameSetup
	}
}

const getDb = async () => {
	return new Promise((resolve, reject) => {
		if(DB) { return resolve(DB); }
		console.log('OPENING DB', DB);
		let request 			= window.indexedDB.open(DB_NAME, DB_VERSION);
		request.onerror 		= e => { console.log('Error opening db', e); reject('Error'); };
		request.onsuccess 		= e => { DB = e.target.result; resolve(DB); };
		request.onupgradeneeded = e => { 
			console.log('onupgradeneeded');
			let db = e.target.result; 
			db.createObjectStore('trades_opm', { autoIncrement: true, keyPath:'id' }); 
			db.createObjectStore('trades_opf', { autoIncrement: true, keyPath:'id' }); 
			db.createObjectStore('trades_setup_opm', { autoIncrement: true, keyPath:'id' }); 
			db.createObjectStore('trades_setup_opf', { autoIncrement: true, keyPath:'id' }); 
		};
	});
}

/**
 * Trades functions
 */

const getList = async () => {
	let db = await getDb();
	return new Promise(resolve => {
		let trans 			= db.transaction([getStore().default],'readonly');
		trans.oncomplete 	= () => { resolve(trades); };
		let store 			= trans.objectStore(getStore().default);
		let trades 			= [];
		store.openCursor().onsuccess = e => {
			let cursor = e.target.result;
			if (cursor) {
				trades.push(cursor.value)
				cursor.continue();
			}
		};
	});
}

const get = async(id) => {
	let db = await getDb();
	return new Promise((resolve, reject) => {
		let objectStore = db.transaction([getStore().default],'readwrite').objectStore(getStore().default);
		let key = Number(id);
		const objectStoreRequest = objectStore.get(key);
		objectStoreRequest.onerror = () => {};
		objectStoreRequest.onsuccess = () => {
			let data = objectStoreRequest.result;
			if(data === undefined) reject('No exist trade id: ' + key)
			resolve(data);
		};
	});
}

const save = async(trade) => {
	console.log('save', trade);
    let db = await getDb();
	return new Promise( (resolve, reject) => {
		try {
			let trans 	= db.transaction([getStore().default],'readwrite');
			let key		= Number(trade.id);
			delete trade.id;

			if(key === 0) {
				trans.oncomplete= () => { resolve(); };
				let objectStore	= trans.objectStore(getStore().default);
				objectStore.put(trade);
			} else {
				let objectStore	= trans.objectStore(getStore().default);
				const osGet		= objectStore.get(key);
				osGet.onsuccess = () => {
					let data = osGet.result;
					for (const propName in trade) {
						data[propName] = trade[propName];
					}
					const osPut 	= objectStore.put(data);
					osPut.onsuccess = () => { resolve(); };
				};
			}

		} catch(error) {
			reject(error)
		}
	});
}

const remove = async (trade) => {
	let db = await getDb();
	return new Promise(resolve => {
		let trans = db.transaction([getStore().default],'readwrite');
		trans.oncomplete = () => { resolve(); };
		let store = trans.objectStore(getStore().default);
		store.delete(trade.id);
	});
}

const removeAll = async() => {
	let db = await getDb();
	return new Promise((resolve, reject) => {
		let transaction = db.transaction([getStore().default],'readwrite');
		transaction.oncomplete = () => { reject('Transaction complete!'); };
		transaction.onerror = () => { reject('Error: ' + transaction.error); };
		const objectStore = transaction.objectStore(getStore().default);
		const objectStoreRequest = objectStore.clear();
		objectStoreRequest.onsuccess = () => { resolve({message: 'Delete data successful', status: 'success'}) };
	});
}

/**
 * Setup trades functions
 */
const getSetupOPM = async () => {
	let db = await getDb();
	let tradeDataSetupOPM = {
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
        r: 		      {value: 'R',		visible: true},
        r2: 		  {value: 'R2',		visible: true},
        return: 	  {value: 'Return',	visible: true},
	};
	return new Promise((resolve) => {
		try {
			let trans = db.transaction([getStore().setup],'readonly');
			trans.oncomplete = () => { resolve(tradeDataSetupOPM); };
			let store = trans.objectStore(getStore().setup);
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if(cursor) tradeDataSetupOPM = {...cursor.value}		
			};
		} catch(err) {
			resolve(tradeDataSetupOPM)
		}
	});
}

const getSetupOPF = async () => {
	let db = await getDb();
	let tradeDataSetup = {
		stakeAmount: 	{value: 'Stake', 	visible: true},
		temporality: 	{value: 'T', 		visible: true},
		average: 		{value: 'X', 		visible: true},
		priceIn: 		{value: 'EP', 		visible: true},
		stopLoss: 		{value: 'SL', 		visible: true},
		takeProfit: 	{value: 'TP', 		visible: true},
		priceClose: 	{value: 'CP', 		visible: true},
		feeIn: 			{value: 'FI', 		visible: true},
		feeOut: 		{value: 'FO', 		visible: true},
		risk: 			{value: 'Risk', 	visible: true},
		rf: 			{value: 'RF', 		visible: true},
		win: 			{value: '%W', 		visible: true},
		lose: 			{value: '%L', 		visible: true},
		profit: 		{value: 'Profit', 	visible: true},
		result: 		{value: 'Result', 	visible: true},
		net: 			{value: 'Net', 		visible: true}
	};
	return new Promise((resolve) => {
		try {
			let trans = db.transaction([getStore().setup],'readonly');
			trans.oncomplete = () => { resolve(tradeDataSetup); };
			let store = trans.objectStore(getStore().setup);
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if(cursor) tradeDataSetup = {...cursor.value}		
			};
		} catch(err) {
			resolve(tradeDataSetup)
		}
	});
}

const saveSetup = async(tradeSetup) => {
	console.log('saveSetup', tradeSetup);
	console.log('saveSetup', getStore().setup);
    let db = await getDb();
	return new Promise( (resolve, reject) => {
		try {
			const storeName = getStore().setup;
			let trans 	= db.transaction([storeName],'readwrite');
			trans.oncomplete= () => { resolve(); };
			let objectStore	= trans.objectStore(storeName);
			const objectStoreRequest = objectStore.clear();
			objectStoreRequest.onsuccess = () => { 
				objectStore.put(tradeSetup);
			};
		} catch(error) {
			reject(error)
		}
	});
}

const resetSetup = async() => {
	let db = await getDb();
	return new Promise((resolve, reject) => {
		let transaction = db.transaction([getStore().setup],'readwrite');
		transaction.oncomplete = () => { reject('Transaction complete!'); };
		transaction.onerror = () => { reject('Error: ' + transaction.error); };
		const objectStore = transaction.objectStore(getStore().setup);
		const objectStoreRequest = objectStore.clear();
		objectStoreRequest.onsuccess = () => { resolve({message: 'Reset data successful', status: 'success'}) };
	});
}

export default {
	getDb,
	remove,
	getList,
	save,	
	get,
	removeAll,
	saveSetup,
	getSetupOPM,
	getSetupOPF,
	resetSetup,
}