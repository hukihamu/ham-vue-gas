import {hVue} from 'ham-vue-gas'
import Main from '@V/main.vue'
import {GasMethodInterface} from '@C/gasMethodInterface'
import {ref} from 'vue'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

hVue.initVue([{
    path: '/',
    component: Main
}], {
    usePlugin: app => app.use(createVuetify({components, directives})),
    vueMainScript() {
        const isLoading = ref(true)
        // vuex処理など
        isLoading.value = false
        return {isLoading}
    },
    vueMainTemplate: '<VOverlay v-model="isLoading" presistent class="justify-center align-center"><template #activator><router-view/></template></VOverlay>'
})


export const gasClient = new hVue.GasClient<GasMethodInterface>()