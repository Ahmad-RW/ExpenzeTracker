import React from 'react'

export const getFeedbackMessage = (component, header, content, status) => {
  component.setState(
    {
      feedbackMessage: (
        <div class={`ui ${status} message`}>
          <div class="content">
            <div>
              {header}
            </div>
            <p>{content}</p>
          </div>
        </div>
      )
    },
    () => {
      setTimeout(() => {
        component.setState({ feedbackMessage: null });
      }, 5000);
    }
  );
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