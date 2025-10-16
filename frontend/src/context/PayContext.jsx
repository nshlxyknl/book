import React, { createContext, useContext } from 'react'

const PayContext = createContext();
export const usepay = ()=> useContext(PayContext)

export default PayContext