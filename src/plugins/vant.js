import Vue from 'vue'
import { Button } from 'vant'

import lang from 'vant/lib/locale/lang/'
import { Locale } from 'vant'

Locale.use('', lang)

Vue.use(Button)
