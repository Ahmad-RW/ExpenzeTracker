import React from 'react'

export const triggerSuccessMessage = (component) => {
  component.setState({
    renderSuccessMessage: true
  }, () => {
    setTimeout(() => {//after setting to true, after 5 seconds it will be set to false. so the message will appear only for 5 seconds.
      component.setState({ renderSuccessMessage: false })
    }, 5000)
  })
}


export const triggerSuccessMessageV2 = (component, messageContent) => {
  component.setState({
    successMessage: messageContent
  }, () => {
    setTimeout(() => {
      component.setState({ successMessage: null })
    }, 5000)
  })
}
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