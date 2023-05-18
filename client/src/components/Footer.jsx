import React from 'react'
const Footer = (props) => {
  const {darkMode} = props

  let bgColor = darkMode ? "red" : "green"

  if(darkMode){
    let bgColor = "darkslategrey"
  }else{
    let bgColor = "white"
  }

  return (
    <footer className={darkMode ? "footerDark mt-5" : "footerLight mt-5"}>
        <a href="http://tylerw.xyz">© 2023 Tyler Wertman Developments</a>
    </footer>
  )
}

export default Footer