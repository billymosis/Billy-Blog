import React, { useState } from "react"
import { Nav } from "../components/nav"
import Footer from "../components/footer"
import { ThemeProvider } from "./themeContext"
import { IntlProvider } from "react-intl"
import English from "../lang/en.json"
import Indonesia from "../lang/id.json"
import { navigate } from "gatsby"
import ScrollToTop from "./ScrollTop"



export const Context = React.createContext()

const getInitialLocale = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedPrefs = window.localStorage.getItem("locale")
    if (typeof storedPrefs === "string") {
      return storedPrefs
    } else {
      if (navigator.language !== "id") {
        setStorageLocale("locale", "en")
        navigate("/en/")
        return "en"
      } else {
        setStorageLocale("locale", "id")
        navigate("/")
        return "id"
      }
    }
  }
}

const setStorageLocale = (key, value) => {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(key, value)
  }
}

const Layout = ({ children }) => {
  const [locale, setLocale] = useState(getInitialLocale())
  const [messages, setMessages] = useState(
    locale === "id" ? Indonesia : English
  )

  function selectLanguage(e) {
    const newLocale = e
    setLocale(newLocale)
    if (newLocale === "id") {
      setMessages(Indonesia)
      setStorageLocale("locale", "id")
    } else {
      setMessages(English)
      setStorageLocale("locale", "en")
    }
  }

  return (
    <Context.Provider value={{ locale, selectLanguage }}>
      <IntlProvider key={locale} locale={locale} messages={messages}>
        <ThemeProvider>
          <body className="bg-gray-100 font-sans leading-normal tracking-normal dark:text-white dark:bg-black transition duration-75 ease-in-out">
            <Nav />

            <Main>{children}</Main>

            <Footer />
          </body>
        </ThemeProvider>
      </IntlProvider>
    </Context.Provider>
  )
}

const Main = ({ children }) => {
  return (
    <main className="container w-full md:max-w-4xl mx-auto pt-20 px-2">
      {children}
      <ScrollToTop></ScrollToTop>
    </main>
  )
}

export { Layout, Main }
