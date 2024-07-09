/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 */
/**********************************************************************************
 * OTP-7476 : Monthly Overdue Remainder for Customer
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
 * Date Created: 09-July-2024
 *
 * Description: This script is for sending an email remainder to customers who have overdue invoices.
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: Jobin and Jismi IT Services Date: 09-July-2024: Created the initial build by JJ0348
 *
 *
 *
 **************/
define(['N/email', 'N/file', 'N/log', 'N/record', 'N/search'],
    /**
 * @param{email} email
 * @param{file} file
 * @param{log} log
 * @param{record} record
 * @param{search} search
 */
    (email, file, log, record, search) => {
        /**
         * Defines the function that is executed at the beginning of the map/reduce process and generates the input data.
         * @param {Object} inputContext
         * @param {boolean} inputContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Object} inputContext.ObjectRef - Object that references the input data
         * @typedef {Object} ObjectRef
         * @property {string|number} ObjectRef.id - Internal ID of the record instance that contains the input data
         * @property {string} ObjectRef.type - Type of the record instance that contains the input data
         * @returns {Array|Object|Search|ObjectRef|File|Query} The input data to use in the map/reduce process
         * @since 2015.2
         */

        const getInputData = (inputContext) => {
            let searchResults = search.create({
                type: search.Type.INVOICE,
                filters: [['mainline','is','T'],'AND',['daysoverdue','greaterthan','0'],'AND',['datecreated','notafter','startoflastmonth']] ,
                columns: ['entity','tranid','email','internalid','amount',]
            });
            log.error("get input data point");
            return searchResults;

        }

        /**
         * Defines the function that is executed when the map entry point is triggered. This entry point is triggered automatically
         * when the associated getInputData stage is complete. This function is applied to each key-value pair in the provided
         * context.
         * @param {Object} mapContext - Data collection containing the key-value pairs to process in the map stage. This parameter
         *     is provided automatically based on the results of the getInputData stage.
         * @param {Iterator} mapContext.errors - Serialized errors that were thrown during previous attempts to execute the map
         *     function on the current key-value pair
         * @param {number} mapContext.executionNo - Number of times the map function has been executed on the current key-value
         *     pair
         * @param {boolean} mapContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} mapContext.key - Key to be processed during the map stage
         * @param {string} mapContext.value - Value to be processed during the map stage
         * @since 2015.2
         */

        const map = (mapContext) => {
            log.error("map point");
            let inv = JSON.parse(mapContext.value);
            let invId = inv.id;
            let customer = inv.values.entity.text;
            let customerId = inv.values.entity.value;
            let email = inv.values.email.value;
            let tranid = inv.values.tranid.value;
            let daysoverdue = inv.values.daysoverdue.value;
            let salesrepId = inv.values.salesrep.value;
            let amount = inv.values.amount.value;
            salesrepId = salesrepId?salesrepId: 'admin';
            log.error(invId+" "+customer+" "+email+" "+tranid+" "+amount); 
            mapContext.write({
                key: customerId,
                value: {
                    customer: customer,
                    email: email,
                    docid: tranid,
                    internalid: invId,
                    salesrep: salesrepId,
                    daysoverdue: daysoverdue,
                    total: total
                }

            });



        }

        /**
         * Defines the function that is executed when the reduce entry point is triggered. This entry point is triggered
         * automatically when the associated map stage is complete. This function is applied to each group in the provided context.
         * @param {Object} reduceContext - Data collection containing the groups to process in the reduce stage. This parameter is
         *     provided automatically based on the results of the map stage.
         * @param {Iterator} reduceContext.errors - Serialized errors that were thrown during previous attempts to execute the
         *     reduce function on the current group
         * @param {number} reduceContext.executionNo - Number of times the reduce function has been executed on the current group
         * @param {boolean} reduceContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {string} reduceContext.key - Key to be processed during the reduce stage
         * @param {List<String>} reduceContext.values - All values associated with a unique key that was passed to the reduce stage
         *     for processing
         * @since 2015.2
         */
        const reduce = (reduceContext) => {
           /* log.error("Entered the reduce point");
            let customerId = reduceContext.key;
            let customerData = reduceContext.values.map(JSON.parse);
            let details = "Customer name,Email,Invoice Document Number,Salesrep,Days Overdue,Invoice amount\n";
            customerData.forEach(function(data){
                details+= `${data.customer},${data.email},${data.docid},${data.salesrep},${data.daysoverdue},${data.total}\n`;
            
            });
            let csvFile = file.create({
                name: `Overdue Invoice${customerId}.csv`,
                fileType: file.Type.CSV,
                contents: details,
                folder: 15

            });
            let fileId = csvFile.save();
            log.error("csv file created successfully");
            let customerRecord = record.load({
                type: record.Type.CUSTOMER,
                id: customerId,
                isDynamic: true
            });
            let salesrep = customerRecord.getValue('salesrep');*/

            try{
                let customerId = reduceContext.key;
                let invoiceData = reduceContext.values.map(JSON.parse);
                //let salesrep = invoiceData[0].salesrep;
                //log.debug("salesrep"+salesrep);
                //salesrep =(salesrep=='admin')? -5:salesrep;
                log.debug("customerId"+customerId);
                csvContent = 'Customer Name, Customer Email,Document Number,Invoice Amount\n';
                invoiceData.forEach(data =>{
                    csvContent+= `${data.customer},${data.email},${data.tranid},${amount}\n`;
                })

                let csvFile = file.create({
                    name: 'invoice.csv',
                    type: file.Type.CSV,
                    contents: csvContent,
                    folder: 15
                })
                csvFile.save();

                email.send({
                    author: -5, //salesrep,
                    recipients: 'mi@outlook.com', //customerId,
                    subject: 'Overdue Notice',
                    body: "Your Invoice is Overdue",
                    attachments: [csvFile]
                })

                log.debug("Email send successfully");


            }catch(e){
                log.error("Error Reduce: ", e);
            }



        }


        /**
         * Defines the function that is executed when the summarize entry point is triggered. This entry point is triggered
         * automatically when the associated reduce stage is complete. This function is applied to the entire result set.
         * @param {Object} summaryContext - Statistics about the execution of a map/reduce script
         * @param {number} summaryContext.concurrency - Maximum concurrency number when executing parallel tasks for the map/reduce
         *     script
         * @param {Date} summaryContext.dateCreated - The date and time when the map/reduce script began running
         * @param {boolean} summaryContext.isRestarted - Indicates whether the current invocation of this function is the first
         *     invocation (if true, the current invocation is not the first invocation and this function has been restarted)
         * @param {Iterator} summaryContext.output - Serialized keys and values that were saved as output during the reduce stage
         * @param {number} summaryContext.seconds - Total seconds elapsed when running the map/reduce script
         * @param {number} summaryContext.usage - Total number of governance usage units consumed when running the map/reduce
         *     script
         * @param {number} summaryContext.yields - Total number of yields when running the map/reduce script
         * @param {Object} summaryContext.inputSummary - Statistics about the input stage
         * @param {Object} summaryContext.mapSummary - Statistics about the map stage
         * @param {Object} summaryContext.reduceSummary - Statistics about the reduce stage
         * @since 2015.2
         */
        const summarize = (summaryContext) => {
                log.error("Summarize");
        }

        return {getInputData, map, reduce, summarize}

    });
