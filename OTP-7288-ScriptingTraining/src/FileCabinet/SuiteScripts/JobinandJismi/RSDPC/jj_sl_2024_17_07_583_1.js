/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
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
 * Description: This script create a task for a scheduled script that pass record id and type
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 16-July-2024: Created the initial build by JJ0348
 *
 *
 *
 **************/
define(['N/redirect', 'N/task', 'N/ui/serverWidget', 'N/url'],
    /**
 * @param{redirect} redirect
 * @param{task} task
 * @param{serverWidget} serverWidget
 * @param{url} url
 */
    (redirect, task, serverWidget, url) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {
                var recordId = scriptContext.request.parameters.recordId;
                var recordType = scriptContext.request.parameters.recordType;
    
                // Create the scheduled script task
                var scriptTask = task.create({
                    taskType: task.TaskType.SCHEDULED_SCRIPT,
                    scriptId: 'customscript_jj_mr_project_record_rspdc', // Replace with your scheduled script ID
                    deploymentId: 'customdeploy_jj_project_update_deploy', // Replace with your scheduled script deployment ID
                    params: {
                        custscript_record_id: recordId,
                        custscript_record_type: recordType
                    }
                });
    
                var taskId = scriptTask.submit();
                log.debug(taskId)

                 // Redirect back to the record
            redirect.toRecord({
                type: recordType,
                id: recordId,
                isEditMode: false
            });
        }

        }

        return {onRequest}

    });
