<template>
    <div class="my-2">
        <label class="my-2 text-warning">Requirements</label>
        <br/>
        <span class="text-muted">Select options..</span>
        <br/>
        <div class="my-2 text-white">
            <span>
                {{totalChecked}} of {{optionsData.length}} - Points <span class="text-warning">{{points}}</span>&nbsp;
                <span v-if="points >= 11" class="px-2 text-success text-opacity-75 bg-success bg-opacity-25 shadow">checklist passed!</span>
                <span v-else-if="points === 0"></span>  
            </span>
        </div>
        <div class="row mt-2 border-top border-secondary" v-for="option in optionsData" :key="option.id">
            <div class="col-12 text-warning text-opacity-75 bg-warning bg-opacity-10 py-1"> 
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" :value="option.value" :id="option.id" :name="option.id" @click="checkYesOrNo">
                    <label class="form-check-label" :for="option.id">
                        {{option.description}}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import usePage from '@/composables/usePage'
import { ref, computed } from 'vue'

export default {
  name: 'CheckListPage',
  setup () {
    usePage({ title: 'Checklist' })
    const checked = ref({})
    
    const checkYesOrNo = (e) => {
        if(e.target.checked) {
            checked.value[e.target.name] = e.target.value
        } else {
            checked.value[e.target.name] = e.target.value - e.target.value
            delete checked.value[e.target.name]
        }
    }

    const points = computed(() => {
        let total = 0
        for(let keyName in checked.value) {
            total += parseInt(checked.value[keyName])
        }
        return total
    })

    const totalChecked = computed(() => {
        return Object.keys(checked.value).length
    })

    const optionsData = [
        { id: 'locdt',      value: '6', description: 'Lateral o canal de tendencia (4 toques)'},
        { id: 'pia4',       value: '3', description: 'Patrón indica a 4H'},
        { id: 'pia1',       value: '2', description: 'Patrón indica a 1H'},
        { id: 'pia15',      value: '1', description: 'Patrón indica a 15M'},
        { id: 'ver',        value: '3', description: 'Volumen en reversión'},
        { id: 'saesromm',   value: '5', description: 'Se apoya en S/R o Media Movil'},
        { id: 'e4h',        value: '3', description: 'Estocastico 4H'},
        { id: 'e1h',        value: '2', description: 'Estocastico 1H'},
        { id: 'e15m',       value: '1', description: 'Estocastico 15M'},
    ]

    return {
        points,
        totalChecked,
        checkYesOrNo,
        checked,
        optionsData
    }
  }
}
</script>
