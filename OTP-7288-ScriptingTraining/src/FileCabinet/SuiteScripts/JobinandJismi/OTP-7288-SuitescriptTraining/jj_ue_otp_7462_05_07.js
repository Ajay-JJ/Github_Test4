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
define(['N/currentRecord', 'N/email', 'N/error', 'N/record', 'N/search', 'N/ui/dialog', 'N/ui/message', 'N/url'],
    /**
 * @param{currentRecord} currentRecord
 * @param{email} email
 * @param{error} error
 * @param{record} record
 * @param{search} search
 * @param{dialog} dialog
 * @param{message} message
 * @param{url} url
 */
    (currentRecord, email, error, record, search, dialog, message, url) => {
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
            try
            {
                var currentRecord = scriptContext.newRecord;
                var hold = currentRecord.getValue({    
                    fieldId: 'custbody_jj_hold_fulfiment'
                });
                if(hold)
                {
                    var form=scriptContext.form;
                    form.removeButton('process');
                }  
            }
            catch(error)
            {
                log.error(error);
            }

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
