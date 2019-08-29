 function getUserDto(userInfo){
     const UserDto = {
         _id : userInfo._id,
         name : userInfo.name,
         email : userInfo.email,
         category : userInfo.category,
         logs : userInfo.logs,
         monthlyIncome : userInfo.monthlyIncome,
         balance : userInfo.balance
     }
     return UserDto
}

module.exports = getUserDto