<template>
  <div class="p-1 text-muted" v-if="!isLoading">
    <ol class="list-group text-white text-opacity-75">
      <li class="list-group-item bg-transparent border-0 text-white text-opacity-75 px-0">
        <div class="ms-2 me-auto">
          <label class="text-warning">Import</label>
          <br/>
          <br/>
          <input class="form-control form-control-sm bg-dark text-muted border-0" accept=".csv" type="file" @change="handleFileUpload($event)">
          <small class="text-muted">
            <b>Format</b>: Separate by comma.
            <div class="alert bg-dark mt-2 mb-0">
              Order fields:
              <br/>
              <br/>
              per, position, reliability, stakeAmount, temporality, average, priceIn, stopLoss,
              takeProfit, priceClose, feeIn, feeOut, orderType, createdByUser, status
            </div>
          </small>
        </div>
      </li>
      <li class="list-group-item bg-transparent border-0 text-white text-opacity-75 px-0">
        <div class="ms-2 me-auto">
          <label class="text-warning">Export</label>
          <br/>
          <button class="btn btn-sm btn-warning my-2" @click.prevent="downloadData()">Download File</button>
        </div>
      </li>
      <li class="list-group-item bg-transparent  border-0 text-white text-opacity-75 px-0">
        <div class="ms-2 me-auto">
          <label class="text-warning">Remove</label><br/>
          <small class="text-muted ">Delete all data, no recovery, previously make a backup.</small><br/>
          <button class="btn btn-sm btn-warning my-2" @click.prevent="removeData()">Remove</button>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import apiTrade from '@/services/trade'
import { useRouter } from 'vue-router'
import usePage from '@/composables/usePage'
import common from '@/utils/common'

export default {
  name: 'OPFTradeListDataPage',
  setup () {
    const router  = useRouter()
    const page    = usePage({title: 'Data'})

    page.isLoading.value = false

    const removeData = () => {
      apiTrade.removeAll().then(() => {
        page.setMessage({ value: '¡removed data!', type: 'success'})
        router.push({ name: 'OPMTradeListPage'})
      }).catch(console.error)
    }

    const handleFileUpload = (event) => {
      let file = event.target.files[0]
      if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
          let data = evt.target.result.split('\n')
          for(let i=0;i<data.length;i++) {
            alert(data[i])
          }
        }
        reader.onerror = function () {
          alert("error reading file");
        }
      }
    }

    const downloadData = () => {
      const data    = { id: 1,name: "Geeks",profession: "developer"}
      let csvRows   = [];
      const headers = Object.keys(data);
      csvRows.push(headers.join(','));
      const values  = Object.values(data).join(',');
      csvRows.push(values)
      const blob    = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      const url     = window.URL.createObjectURL(blob)
      const a       = document.createElement('a')
      a.setAttribute('href', url)
      a.setAttribute('download', 'CNmT-' + common.currentDateTime() + '.csv');
      a.click()
    }

    return {
      downloadData,
      removeData,
      isLoading: page.isLoading,
      handleFileUpload
    }
  }
}
</script>
