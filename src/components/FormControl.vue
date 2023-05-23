<template>
    <div class="form-control" style="width: 100%">
        <a-row type="flex" :wrap="false" align="middle" :gutter="[8,8]">
            <a-col v-bind="labelStyle">
                <label :style="`font-size:${labelSize}`">
                    {{ label }}
                </label>
            </a-col>
            <a-col flex="auto">
                <slot/>
            </a-col>
        </a-row>
    </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
    label: String,
    labelShrink: {
        type: Boolean,
        default: true
    },
    labelWidth: {
        type: String,
        default: '90px'
    },
    labelSize:{
        type:String
    }
})

const labelStyle = computed(()=>{
    return {
        flex: props.labelShrink ? props.labelWidth : "100%"
    }
})
</script>