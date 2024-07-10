require(['N/record','N/search'],
    function(record,search){
        try {
            var filter = [
                ['status', 'is', 'VendBill:A'],
                'AND',
                ['mainline', 'is', 'T'],
                'AND',
                ['datecreated', 'is', 'lastMonth']

            ];
            var columns = [
                search.createColumn({ name: 'transactionnumber', label: 'Transaction Number' }),
                search.createColumn({ name: 'entity', label: 'Vendor Name' }),
                search.createColumn({ name: 'entitystatus', label: 'Status' }),
                search.createColumn({ name: 'amount', label: 'Amount' })    
            ];
            var customerSearch = search.create({
                type: search.Type.TRANSACTION,
                filters: filter,
                columns: columns
            });
            var searchResults = customerSearch.run().getRange({ start: 0, end: 30 });
            customerSearch.save();
            searchResults.forEach(function(result) {
                var Vendor = result.getValue({ name: 'entity' });
                var Transactionno = result.getText({ name: 'transactionnumber' });
                var Status = result.getText({ name: 'entitystatus' });
                var Amount = result.getText({ name: 'amount' });
                log.debug('Customer List :', 'Vendor Name: ' + Vendor + ', Transaction Number: ' + Transactionno +
                    ', Status: ' + Status + 'Amount: ' + Amount );
                return true;
            });
        } catch (e) {
            log.error('Error while creating', e.toString());
        }
    }
);
