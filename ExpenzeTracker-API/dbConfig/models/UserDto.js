 function getUserDto(userInfo){
     const UserDto = {
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