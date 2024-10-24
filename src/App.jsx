import React from 'react'
import ProductChart from './components/ProductChart'
import './app.css'
import CategoryChart from './components/CategoryChart'

export default function App() {
  return (
    <>
      <div className='app'>
        <ProductChart/>
        <CategoryChart/>
      </div>
    </>
  )
}

