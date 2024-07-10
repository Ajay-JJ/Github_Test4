/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/**********************************************************************************
 * OTP-7481 : External Custom Record form and actions
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
 * Date Created: 10-July-2024
 *
 * Description: This script have a custom form and transfer it to a custom record after submitting the form
 *
 *
 * REVISION HISTORY
 *
 * @version 1.0 company name: 10-July-2024: Created the initial build by JJ0348
 *
 *
 *
 **************/
define(['N/email', 'N/record', 'N/runtime', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (email, record, runtime, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {
            if (scriptContext.request.method === 'GET') {
                createForm(scriptContext);
            } else {
                handleFormSubmission(scriptContext);
            }


            function createForm(scriptContext) {
                let form = serverWidget.createForm({
                    title: 'External Customer Notification'
                });

                form.addField({
                    id: 'custpage_customer_name',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Customer Name'
                }).isMandatory = true;

                form.addField({
                    id: 'custpage_customer_email',
                    type: serverWidget.FieldType.EMAIL,
                    label: 'Customer Email'
                }).isMandatory = true;

                form.addField({
                    id: 'custpage_subject',
                    type: serverWidget.FieldType.TEXT,
                    label: 'Subject'
                }).isMandatory = true;

                form.addField({
                    id: 'custpage_message',
                    type: serverWidget.FieldType.TEXTAREA,
                    label: 'Message'
                }).isMandatory = true;

                form.addSubmitButton({
                    label: 'Submit'
                });

                scriptContext.response.writePage(form);
            }

            function handleFormSubmission(scriptContext) {
                let request = scriptContext.request;
                let customerName = request.parameters.custpage_customer_name;
                let customerEmail = request.parameters.custpage_customer_email;
                let subject = request.parameters.custpage_subject;
                let message = request.parameters.custpage_message;

                let customerId = findCustomerByEmail(customerEmail);

                let newRecord = record.create({
                    type: 'customrecord_jj_otp_7481',
                    isDynamic: true
                });

                newRecord.setValue('custrecord_jj_name', customerName);
                newRecord.setValue('custrecord_jj_email_ext', customerEmail);
                newRecord.setValue('custrecord_jj_subject', subject);
                newRecord.setValue('custrecord_jj_message', message);

                if (customerId) {
                    newRecord.setValue('custrecord_jj_customer', customerId);
                }

                let recordId = newRecord.save();

                let adminEmail = -5;
                sendEmailNotification(adminEmail, subject, message);

                if (customerId) {
                    let salesRepEmail = getSalesRepEmail(customerId);
                    if (salesRepEmail) {
                        sendEmailNotification(salesRepEmail, subject, message);
                    }
                }

                scriptContext.response.write('Record created successfully with ID: ' + recordId);
            }

            function findCustomerByEmail(email) {
                let customerSearch = search.create({
                    type: search.Type.CUSTOMER,
                    filters: [
                        ['email', search.Operator.IS, email]
                    ],
                    columns: ['internalid']
                });

                let customerId = null;
                customerSearch.run().each(function (result) {
                    customerId = result.getValue('internalid');
                    return false;  // Stop after the first result
                });

                return customerId;
            }

            function getSalesRepEmail(customerId) {
                let customerRecord = record.load({
                    type: record.Type.CUSTOMER,
                    id: customerId
                });

                let salesRepId = customerRecord.getValue('salesrep');
                if (salesRepId) {
                    let salesRepRecord = record.load({
                        type: record.Type.EMPLOYEE,
                        id: salesRepId
                    });
                    return salesRepRecord.getValue('email');
                }
                return null;
            }

            function sendEmailNotification(emailAddress, subject, message) {
                email.send({
                    author: -5,
                    recipients: emailAddress,
                    subject: subject,
                    body: message
                });
            }

        }

        return { onRequest }

    });
