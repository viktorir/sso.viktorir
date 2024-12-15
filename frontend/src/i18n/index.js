import { createI18n } from 'vue-i18n'
import en from '@/i18n/en.json'
import ru from '@/i18n/ru.json'

const messages = {
  en,
  ru
}

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  
  messages
})

export default i18n;