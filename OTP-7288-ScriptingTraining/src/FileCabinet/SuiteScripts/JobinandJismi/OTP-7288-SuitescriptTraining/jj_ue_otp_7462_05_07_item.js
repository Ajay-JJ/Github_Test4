/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
/**********************************************************************************
 * OTP-7462 : Restrict Item Fullfilment
 *
 *
 * ********************************************************************************
 *
 * ********************
 * company name
 *
 * Author: Ajay Sankar J, Jobin and Jismi IT Services
 *
 *
 * Date Created: 05-July-2024
 *
 * Description: This script restricts item fulfillment if hold fulfillment button is checked.
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 05-July-2024: Created the initial build by JJ0348
 *
 *
 *
 **************/
define(['N/error', 'N/record'],
    /**
 * @param{error} error
 * @param{record} record
 */
    (error, record) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {
            let recordType = scriptContext.newRecord.type;
            if (recordType == record.Type.ITEM_FULFILLMENT) {
                let currentRec = scriptContext.newRecord;
                //Fetch the details of sales order.
                let salesOrderId = currentRec.getValue('createdfrom');
                let salesInfo = record.load({
                    type: 'salesorder',
                    id: salesOrderId
                });
                //check whether the Don't Allow fulfillment is checked.
                let checkbox = salesInfo.getValue({
                    fieldId: "custbody_jj_hold_fulfiment"
                });
                //Fetch the Sales Manager Details
                var employeeRecord = record.load({
                    type: record.Type.EMPLOYEE,
                    id: -5
                });
                let SalesMangerName = employeeRecord.getText({
                    fieldId:"entityid"
                });
               // if Checkbox is enabled Throw error message
                if (checkbox) {
                    let errorMsg = error.create({
                        name: 'SALES_ORDER_ERROR',
                        message: 'Fulfillment for the sales order ID: ' + salesOrderId + 'is restricted by the Sales Manager ' + "<b>" +SalesMangerName +"</b>" + " Please Contact with Him",
                        notifyOff: false
                    });
                    alert('Fulfillment is restricted by the Sales Manager.');
                    throw errorMsg;
                }
            }

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
