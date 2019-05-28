export const triggerSuccessMessage = (component) =>{
    component.setState({
        renderSuccessMessage : true
    }, ()=>{setTimeout(()=>{//after setting to true, after 5 seconds it will be set to false. so the message will appear only for 5 seconds.
       component.setState({renderSuccessMessage:false})
   },5000)})
}