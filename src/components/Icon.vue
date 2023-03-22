<template>
    <component :is="iconComponent" />
</template>

<script>
import { computed } from 'vue' 
import BarChartFill from '../components/icons/BarChartFill'

const icons = {
  BarChartFill
}

export default {
    name: 'IconComponent',
    props: {
        name: {
            type: String,
            required: true,
            validator(value) {
                return Object.prototype.hasOwnProperty.call(icons, value)
            }
        }
    },
    setup(props) {
        return {
            iconComponent : computed(() => icons[props.name])
        }
    }
}
</script>