/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
/**********************************************************************************
 * RSPDC-583 : Implement "Calculate Billed %" Button in the Project record, Project Task Record, Billing Schedule, Payment Schedule based on the Proforma Invoice: Test Account
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
 * Date Created: 16-July-2024
 *
 * Description: This script adds a button named Calculate Billed % in relevant records
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 16-July-2024: Created the initial build by JJ0348
 *
 *
 *
 **************/
define(['N/ui/serverWidget', 'N/url','N/redirect', 'N/task'],
    /**
 * @param{serverWidget} serverWidget
 * @param{url} url
 */
    (serverWidget, url, redirect, task) => {
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
            if (scriptContext.type === scriptContext.UserEventType.VIEW || scriptContext.type === scriptContext.UserEventType.EDIT) {
                var form = scriptContext.form;
                var rec = scriptContext.newRecord;
    
                var recordId = rec.id;
                var recordType = rec.type;
    
                // Create Suitelet URL for button
                var suiteletUrl = url.resolveScript({
                    scriptId: 'customscript_jj_sl_add_583_t1',
                    deploymentId: 'customdeploy_jj_sl_add_583_t1_d1',
                    params: {
                        recordId: recordId,
                        recordType: recordType
                    }
                });

                log.debug('Generated Suitelet URL', suiteletUrl);

                // Add the button to the form
            form.addButton({
                id: 'custpage_calculate_billed_btn',
                label: 'Calculate Billed %',
                functionName: 'window.location.href="' + suiteletUrl + '";'
            });
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
