/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
/**********************************************************************************
 * OTP-7461 : Overdue Email
 *
 *
 * ********************************************************************************
 *
 * ********************
 * company name
 *
 * Author: Jobin and Jismi IT Services
 *
 *
 * Date Created: 04-July-2024
 *
 * Description: This script is for sending an email alert when creating a sales order for an overdue customer.
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 03-July-2024: Created the initial build by JJ0353
 *
 *
 *
 **************/
define(['N/email', 'N/log', 'N/record', 'N/ui/dialog', 'N/ui/message', 'N/url'],
/**
 * @param{email} email
 * @param{log} log
 * @param{record} record
 * @param{dialog} dialog
 * @param{message} message
 * @param{url} url
 */
function(email, log, record, dialog, message, url) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    /*function pageInit(scriptContext) {

    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
   /* function fieldChanged(scriptContext) {

    }

    /**
     * Function to be executed when field is slaved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     *
     * @since 2015.2
     */
    /*function postSourcing(scriptContext) {

    }

    /**
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    /*function sublistChanged(scriptContext) {

    }

    /**
     * Function to be executed after line is selected.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    /*function lineInit(scriptContext) {

    }

    /**
     * Validation function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @returns {boolean} Return true if field is valid
     *
     * @since 2015.2
     */
    /*function validateField(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
   /* function validateLine(scriptContext) {

    }

    /**
     * Validation function to be executed when sublist line is inserted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    /*function validateInsert(scriptContext) {

    }

    /**
     * Validation function to be executed when record is deleted.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    /*function validateDelete(scriptContext) {

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {
        try
            {
                var currentRecord = scriptContext.currentRecord;
                var salesOrderId = currentRecord.id;
                var customer = currentRecord.getValue({     //Get customer value
                    fieldId: 'entity'
                });
                var customername = currentRecord.getText({     //Get customer name
                    fieldId: 'entity'
                });
                var salesrep=currentRecord.getValue({
                    fieldId: 'salesrep'
                });
                var customerRec = record.load({             //Load customer record
                    type: record.Type.CUSTOMER,
                    id: customer,
                })
                var overdue = customerRec.getValue({        //Get overdue balance
                    fieldId: 'overduebalance'
                });
                var salesOrderLink = url.resolveRecord({
                    recordType: record.Type.SALES_ORDER,
                    recordId: salesOrderId,
                    isEditMode: false,
                });
                if (overdue) {                              //Send email to salesrep
                    var emailBody = 'Customer: ' + customername + ' has an overdue balance of $' + overdue + '.<br>';
                    emailBody += 'Sales Order link: <a href="' + salesOrderLink + '">View Sales Order</a>';                            
                    email.send({
                        author: -5,
                        recipients: salesrep,
                        subject: 'Sales Order created for Overdue Customer',
                        body: emailBody
                    });
                }
                return true;
            }
            catch(error)
            {
                log.debug(error);
            }
 

    }

    return {
       // pageInit: pageInit,
        //fieldChanged: fieldChanged,
        //postSourcing: postSourcing,
        //sublistChanged: sublistChanged,
        //lineInit: lineInit,
        //validateField: validateField,
        //validateLine: validateLine,
        //validateInsert: validateInsert,
        //validateDelete: validateDelete,
        saveRecord: saveRecord
    };
    
});
