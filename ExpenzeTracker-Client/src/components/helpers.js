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
            component.setState({successMessage : null})
        }, 5000)
    })
}
export const checkIfInputIsNotNumber = e => {
    if (isNaN(e.target.value)) {
        e.target.value = 0
    }
}


export const checkEmptyName = (categoryName) => {
    return categoryName.length === 0
}