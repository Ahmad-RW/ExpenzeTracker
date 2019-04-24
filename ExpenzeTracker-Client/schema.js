const wallet = new schema({
    catagory : [
        {
            name: String,
            balance: Number,
            actions: [{
                Type: {
                    type: String,
                    enum: ['TRANSFER', 'INCOME', 'EXPENSE']

                },
                timeStamp: new Date(),
                amount: Number,
                in: Boolean,
                to: String,
                from: String
            }
            ]

        }
    ]

})