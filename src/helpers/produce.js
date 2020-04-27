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
                            reference: dproduces_object.reference,
                            category: dproduces_object.category,
                            quantity: business_produce_object.quantity,
                            id: business_produce_object.id,
                            dproduce_id: dproduces_object.id,
                            business_id: business_produce_object.business_id,
                            user_id: business_produce_object.user_id,
                            units: dproduces_object.units
                            // tlivestocks: business_produce_object.tlivestocks
                        }

                        final_list.push(processed)

                    }
                    
                }
                
            }

            return final_list

        }

    }
}