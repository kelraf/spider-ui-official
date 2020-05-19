export const DLivestockProcessor = {
    process_business_livestock: (dlivestock_array, business_livestock) => {

        if(business_livestock.length == 0) {
            return []
        } else {

            let final_list = []

            for (const dlivestock_object of dlivestock_array) {

                for (const business_livestock_object of business_livestock) {

                    if(dlivestock_object.id == business_livestock_object.dlivestock_id) {

                        let processed = {
                            reference: dlivestock_object.reference,
                            type: dlivestock_object.type,
                            breed: dlivestock_object.breed,
                            price: business_livestock_object.price,
                            quantity: business_livestock_object.quantity,
                            id: business_livestock_object.id,
                            dlivestock_id: dlivestock_object.id,
                            business_id: business_livestock_object.business_id,
                            user_id: business_livestock_object.user_id,
                            tlivestocks: business_livestock_object.tlivestocks
                        }

                        final_list.push(processed)

                    }
                    
                }
                
            }

            return final_list

        }

    }
}