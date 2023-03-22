import { ref } from 'vue'
import { useStore } from 'vuex'

const usePage = ( {title, message = {}} ) => {

    const store = useStore()
    store.commit('setTitle', title)
    store.commit('setMessage', message)
    const isLoading = ref(true)
    const setMessage = ( { value, type } ) => {
        store.commit('setMessage', { value, type })
    }
    return {
        isLoading,
        setMessage
    }

}

export default usePage