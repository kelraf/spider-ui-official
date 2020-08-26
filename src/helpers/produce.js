export const DProduceProcessor = {
    process_business_produce: (dproduces_array, business_produce) => {

        if(business_produce.length == 0) {
            return []
        } else {

            let final_list = []

            for (const dproduces_object of dproduces_array) {

                for (const business_produce_object of business_produce) {

                    if(dproduces_object.id == business_produce_object.dproduce_id) {

                        let processed = {
                            referenced_animal: dproduces_object.referenced_animal,
                            produce_name: dproduces_object.produce_name,
                            quantity: business_produce_object.quantity,
                            id: business_produce_object.id,
                            dproduce_id: dproduces_object.id,
                            business_id: business_produce_object.business_id,
                            user_id: business_produce_object.user_id,
                            units: dproduces_object.units
                        }

                        final_list.push(processed)

                    }
                    
                }
                
            }

            return final_list

        }

    }
}