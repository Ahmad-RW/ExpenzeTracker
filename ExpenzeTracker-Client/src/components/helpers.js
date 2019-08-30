import React from 'react'
import {notify} from 'react-notify-toast'
export const getFeedbackMessage = (component, header, content, status) => {
  let myColor = { background: '#0E1717', text: "#FFFFFF" };
  notify.show(header, status,5000, myColor)
};
export const checkIfInputIsNotNumber = e => {
  if (isNaN(e.target.value)) {
    e.target.value = 0
  }
}


export const checkEmptyName = (categoryName) => {
  return categoryName.length === 0
}

export const getCategory = (id, categories) => {
  let result;
  categories.forEach(elem=>{
    if(elem._id === id){
      result = {...elem}
    }
  })

  return result
}

