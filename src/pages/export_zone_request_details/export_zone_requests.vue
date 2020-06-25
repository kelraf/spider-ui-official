<template>
  
  <div style="overflow-y: scroll; max-height: 100vh;" class="card">
    <div class="default-according style-1 bitcoin-accordion" id="accordionoc">

        <ExportZoneRequest 
            v-for="(export_zone_request, index) in export_zone_requests" 
            :exportZoneRequest="export_zone_request" 
            :key="index+=1" 
            :index="index+=1"
            v-on:edit-export-zone-request="editExportZoneRequest" 
        />

    </div>

    <Reject 
        v-on:export-zone-request-edit-success="exportZoneEditSuccess" 
        :actionData="action_data" 
        id="reject" 
        style="display: none;" 
    />

    <Accept 
        v-on:export-zone-request-edit-success="exportZoneEditSuccess" 
        :actionData="action_data" 
        id="accept" 
        style="display: none;" 
    />

  </div>

</template>

<script>

import ExportZoneRequest from "./export_zone_request"
import Accept from "./confirm/accept"
import Reject from "./confirm/reject"

export default {
    data() {
        return {
            export_zone_requests: [],
            action_data: {}
        }
    },
    components: {
        ExportZoneRequest,
        Reject,
        Accept
    },
    props: {
        exportZoneRequests: Array
    },
    watch: {
        exportZoneRequests: {
            immediate: true,
            handler() {
                if(this.exportZoneRequests !== undefined && this.exportZoneRequests.length > 0) this.export_zone_requests = this.exportZoneRequests
            }
        }
    },
    methods: {
        editExportZoneRequest(actionData) {

            this.action_data = actionData
            
            let modal = new Custombox.modal({
                content: {
                    effect: 'slip',
                    target: `#${actionData.action}`
                }
            })

            modal.open()

        },
        exportZoneEditSuccess(data) {

            this.export_zone_requests = this.export_zone_requests.map((export_zone_request) => {

                if(export_zone_request.id == data.id) {

                    export_zone_request.status = data.status
                    return export_zone_request

                } else {

                    return export_zone_request

                }

            })

        }
    }
}
</script>

<style>

</style>