/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
/**********************************************************************************
 * OTP-7461 : Overdue Warning
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
 * Description: Give a warning to the (Sales rep) while they create a sales order for the overdue customer.
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 04-July-2024: Created the initial build by JJ0348
 *
 *
 *
 **************/
define(['N/search', 'N/ui/dialog','N/record'],
/**
 * @param{search} search
 * @param{dialog} dialog
 * @param{record} record
 */
function(search, dialog, record) {
    
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
    /*function fieldChanged(scriptContext) {

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
   /* function validateField(scriptContext) {
        if (scriptContext.fieldId === 'entity') { // Check if the field changed is the customer field
            var rec = scriptContext.currentRecord;
            var customerId = rec.getValue({ fieldId: 'entity' });

            if (customerId) {
                //var overdueInvoices = checkOverdueInvoices(customerId);
                var customerRec = record.load({             //Load customer record
                    type: record.Type.CUSTOMER,
                    id: customerId,
                })
                var overdue = customerRec.getValue({        //Get overdue balance
                    fieldId: 'overduebalance'
                });
                if (overdue> 0) {
                    var message = 'Warning: This customer has overdue invoices:\n\n';
                    //overdueInvoices.forEach(function(invoice) {
                        //message += 'Invoice #: ' + invoice.invoiceNumber + ', Due Date: ' + invoice.dueDate + '\n';
                   // });

                    dialog.alert({
                        title: 'Overdue Invoices',
                        message: message
                    });
                }
            }
        }
        return true; // Return true to continue with the change

    }*/
    /*function checkOverdueInvoices(customerId) {
        var overdueInvoices = [];

        var invoiceSearch = search.create({
            type: search.Type.CUSTOMER,
            filters: [
                ['entity', 'anyof', customerId],
                //'AND',
                //['status', 'anyof', 'CustInvc:A'], // Open Invoices
                'AND',
                ['daysoverdue', 'greaterthan', 0]
                //'AND',
                //['mainline', 'is', 'T']
            ],
            columns: [
                'tranid',
                'duedate'
            ]
        });
        invoiceSearch.run().each(function(result) {
            overdueInvoices.push({
                invoiceNumber: result.getValue('tranid'),
                dueDate: result.getValue('duedate')
            });
            return true;
        });

        return overdueInvoices;
    }*/

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
        var currentRecord=scriptContext.currentRecord;
      var customerId=currentRecord.getValue({
        fieldId:"entity"
      })
      var customerRecord = record.load({
          type: record.Type.CUSTOMER,
          id: customerId
      });
      var overDueBalance = customerRecord.getValue({
        fieldId: 'overduebalance'
      });
      if(overDueBalance > 0){
          dialog.alert({
            title: 'OverDue Customer',
            message: 'This Customer have OverDue Balance of '+ overDueBalance
          });
          return false; 
      }
      return true;

    }

    return {
        //pageInit: pageInit,
        //fieldChanged: fieldChanged,
        //postSourcing: postSourcing,
       // sublistChanged: sublistChanged,
       // lineInit: lineInit,
        //validateField: validateField,
       // validateLine: validateLine,
       // validateInsert: validateInsert,
       // validateDelete: validateDelete,
        saveRecord: saveRecord
    };
    
});
