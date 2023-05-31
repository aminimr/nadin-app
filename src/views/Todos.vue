<script setup lang="ts">
import {ref, reactive} from 'vue';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons-vue';
import {formValidator} from "../utils/FormValidator";
import {useI18n} from "vue-i18n";
import {useNotification} from "@/utils/NotificationManager";

const {t} = useI18n()
const props = defineProps({
    testMode: Boolean
})
const {showSuccess, showError} = useNotification()

interface IFormModel {
    title: string,
    checked: boolean
}

const formModel = reactive<IFormModel>({
    title: '',
    checked: false
});


const rules = {
    title:
        {
            type: 'string',
            required: true,
            validator: formValidator(/[a-zA-Z0-9@.]/, t('messages.todoFill'))
        }
}
const todos = ref([
    {
        title: 'Task Title 1',
        checked: false
    },
    {
        title: 'Task Title 2',
        checked: false
    },
    {
        title: 'Task Title 3',
        checked: false
    },
    {
        title: 'Task Title 4',
        checked: false
    },
]);

function removeTodo(item: object) {
    todos.value = todos.value.filter(todo => item !== todo)
}

function addTodo() {
    if (!formModel.title.trim()) {
        return showError(`${t('messages.todoFill')}`)
    }
    todos.value.push({
        ...formModel
    })
    showSuccess(`${t('messages.todoFill')}`)
    formModel.title = ''
    formModel.checked = false
}

const result = ref('')

</script>

<template>
    <section style="display: flex ; justify-content: center">
        <div class="content-page" style="min-width: 300px; width: 500px; max-width: 100%;">
            <a-form
                    :model="formModel"
                    autocomplete="off"
                    @finish="addTodo"
                    :rules="rules"
            >
                <a-form-item
                        ref="title"
                        name="title">
                    <a-input
                            @keydown.enter="addTodo" size="large" v-model:value="formModel.title"
                            :placeholder="$t('common.title')">
                        <template #suffix>
                            <PlusOutlined @click="addTodo"
                                          html-type="submit"
                                          :style="{fontSize: '18px', color: '#777'}"/>
                        </template>
                    </a-input>
                </a-form-item>

            </a-form>


            <a-list item-layout="horizontal" style="min-width: 350px ; max-width: 600px" :data-source="todos">
                <template #renderItem="{ item }">
                    <a-list-item>
                        <template #actions>
                            <DeleteOutlined @click="removeTodo(item)" :style="{fontSize: '18px', color: '#777'}"/>
                        </template>
                        <a-list-item-meta>
                            <template #title>
                                <a-checkbox :class="{'todo-checked': item.checked}" v-model:checked="item.checked">
                                    {{ item.title }}
                                </a-checkbox>
                            </template>
                        </a-list-item-meta>
                    </a-list-item>
                </template>
            </a-list>
        </div>
    </section>
</template>


<style lang="scss">
.todo-checked {
  text-decoration: line-through;
  color: #777;
}
</style>

