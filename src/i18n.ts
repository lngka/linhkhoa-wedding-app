import { createContext, useContext } from 'react'
import { contents, type Content, type Lang } from './content'

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'vi', setLang: () => {} })

export const useLang = () => useContext(LangContext)
export const useContent = (): Content => contents[useContext(LangContext).lang]
