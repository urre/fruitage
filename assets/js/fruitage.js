/**

 *
 * Fruitage
 * Simple Chrome Extension for Harvestapp.com 
 * that adds extra columns on invoices and reports, showing balance/totals without 25% VAT.
 * Urban Sanden urban@sprintworks.se
 *
 */

 (function ($) {

    var Fruitage = {

        init: function() {
           
            //  Invoice -> Overview. Add new amount in a new column for every row
            this.invoicesOverview();

            //  Invoice -> Overview. Add new column with total
            // this.invoicesTotals();

            // Invoice -> Overview. Add figures to the summary section
            // this.invoicesSummary();

            // Invoice -> Report
            // this.invoiceReports();

            // Reports -> Time
            // this.reportsTime();

            // Reports -> Uninvoiced
            // this.reportsUninvoiced();

            // Estimates
            // this.estimates();

        },

        isDollarOrEuro: function(currency) {
            
            if (['$', '€'].indexOf(currency) >= 0) {
                return true;
            }

        },

        getCurrency: function(currency) {
            
            return currency.match(/[a-zA-Z]+/g);

        },

        getCurrencySymbol: function(string) {

                // Currency format:

                // $345 (symbol before)
                // 345$ (symbol after)
                // 345 USD (ISO code after)
                // USD 345 (ISO code before)
                // $345 USD (symbol before, ISO code after)
                // USD $345 (ISO code before, symbol before)
                // 345$ USD (symbol after, ISO code after)
                // USD 345$ (ISO code before, symbol after)

        },

        numberWithCommas: function(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        convertStringToNumber: function(str) {
            return parseFloat(str.replace(',','.').replace(' ',''))
        },

        invoicesOverview: function() {

            $('.js-invoices-table thead tr').each(function() {
                $(this).find('.col-balance').after('<th>Balance without VAT</th>');
            });

            if($('.js-invoices-table').length) {
                $('.js-invoices-table tbody').find('tr').each(function() {
                    
                    var withoutVAT = $(this).find('td').eq(4).find('strong').text();
                    var currency = Fruitage.getCurrency(withoutVAT);
                    var withoutVAT_number = Fruitage.convertStringToNumber(withoutVAT);
                    
                    console.log('withoutVAT: '+withoutVAT);
                    console.log('withoutVAT_number: '+withoutVAT_number);
                    console.log('currency: '+currency);

                    $(this).find('td').eq(4).after('<td ><strong>'+withoutVAT_number*0.8+'<strong></td>');
                });
            }

        },

        invoicesTotals: function() {

            if($('.js-total-balance').length) {
                var withoutVAT = $('.js-total-balance').text();
                var currency = Fruitage.getCurrency(withoutVAT);

                var withoutVAT_number = withoutVAT.replace(/[^0-9\.,\n]|,[^0-9]/g, "").replace(",", ".");
                var withoutVAT_number_clean = parseFloat(withoutVAT_number.replace(",", "."));

                if(Fruitage.isDollarOrEuro(currency)) {
                    $('.js-total-balance').after('<td style="text-align: left;"><strong>'+currency+' '+Fruitage.numberWithCommas(parseFloat(withoutVAT_number_clean*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+'</strong></td>');                
                } else {
                    $('.js-total-balance').after('<td style="text-align: left;"><strong>'+Fruitage.numberWithCommas(parseFloat(withoutVAT_number_clean*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+' '+currency+'</strong></td>');
                }
            }

        },

        invoicesSummary: function() {
            
            if($('.invoices-big-data').length) {
                
                var withoutVATOpen = $('.invoices-big-data .amount-open').find('h2').text();
                var withoutVATReceived = $('.invoices-big-data .amount-received').find('h2').text();
                var currency = Fruitage.getCurrency(withoutVATOpen);
                var withoutVAT_numberOpen = parseFloat(withoutVATOpen.replace(/[^0-9\.,\n]|,[^0-9]/g, "").replace(",", "."));
                
                var withoutVAT_numberReceived = parseFloat(withoutVATReceived.replace(/[^0-9\.,\n]|,[^0-9]/g, "").replace(",", "."));
                

                if(Fruitage.isDollarOrEuro(currency)) {

                    $('.invoices-big-data .amount-open').find('h2').eq(0).after('<h2 style="color: #aaa; font-size: 150%;">'+Fruitage.numberWithCommas(parseFloat(withoutVAT_numberOpen*0.8).toFixed(2))+'<span style="font-size: 45%;"> (Without VAT)</span><h2>');

                    $('.invoices-big-data .amount-received').find('h2').eq(0).after('<h2 style="color: #aaa; font-size: 150%;">'+Fruitage.numberWithCommas(parseFloat(withoutVAT_numberReceived*0.8).toFixed(2))+'<span style="font-size: 45%;"> (Without VAT)</span><h2>');
                } else {
                    $('.invoices-big-data .amount-open').find('h2').eq(0).after('<h2 style="color: #aaa; font-size: 150%;">'+Fruitage.numberWithCommas(parseFloat(withoutVAT_numberOpen*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+'<span style="font-size: 45%;"> (Without VAT)</span><h2>');

                    $('.invoices-big-data .amount-received').find('h2').eq(0).after('<h2 style="color: #aaa; font-size: 150%;">'+Fruitage.numberWithCommas(parseFloat(withoutVAT_numberReceived*0.8).toFixed(2))+' '+currency+'<span style="font-size: 45%;"> (Without VAT)</span><h2>');
                }

            }
        },

        invoiceReports: function() {

            if($('.timesheet_summary').length) {
            
                // Header
                $('.timesheet_summary thead').find('tr').each(function(){
                    $(this).find('.amount').eq(2).after('<th>Balance without VAT</th>');
                });

                // Body
                $('.timesheet_summary tbody').find('tr').each(function(){
                    var withoutVAT = $(this).find('td.amount').find('span').text();
                    var currency = Fruitage.getCurrency(withoutVAT);
                    var withoutVAT_number = withoutVAT.replace(/[^0-9\.,\n]|,[^0-9]/g, "").replace(",", ".");

                    if(Fruitage.isDollarOrEuro(currency)) {
                        $(this).find('td.amount').eq(2).after('<td><a>'+currency+' '+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+'</a></td>');
                    } else {
                        $(this).find('td.amount').eq(2).after('<td><a>'+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+' '+currency+'</a></td>');
                    }

                });

                // Totals
                var withoutVAT = $('.timesheet_summary').eq(0).find('tfoot .total_amount').text();
                var currency = Fruitage.getCurrency(withoutVAT);
                var withoutVAT_number = withoutVAT.replace(/[^0-9\.,\n]|,[^0-9]/g, "").replace(",", ".");

                if(Fruitage.isDollarOrEuro(currency)) {
                    $('.timesheet_summary').eq(0).find('tfoot .total_amount').after('<td class="total_amount"><strong>'+currency+' '+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+'</strong></td>');
                } else {

                    $('.timesheet_summary').eq(0).find('tfoot .total_amount').after('<td class="total_amount"><strong>'+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+' '+currency+'</strong></td>');
                }

            }


        },

        reportsUninvoiced: function() {

            if($('.uninvoiced-report').length) {

                // Header
                $('.uninvoiced-report thead').find('tr').each(function(){
                    $(this).find('.ur-unamount').after('<th><span>Uninvoiced amount without VAT</span></th>');
                });

                // // Body
                $('.uninvoiced-report tbody').find('tr').each(function() {
                    
                    var withoutVAT = $(this).find('td.ur-unamount').text();
                    var currency = Fruitage.getCurrency(withoutVAT);
                    var withoutVAT_number = withoutVAT.replace(/[^0-9\.,\n]|,[^0-9]/g, "").replace(",", ".");
                    
                    if(Fruitage.isDollarOrEuro(currency)) {
                        $(this).find('.ur-unamount').after('<td class="ur-unamount">'+currency+' '+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+'</td>');
                    } else {
                        $(this).find('.ur-unamount').after('<td class="ur-unamount">'+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+' '+currency+'</td>');
                    }
                });

                // Totals
                var withoutVAT = $('.uninvoiced-report tfoot').find('.ur-unamount').text();
                var currency = Fruitage.getCurrency(withoutVAT);
                var withoutVAT_number = withoutVAT.replace(/[^0-9\.,\n]|,[^0-9]/g, "").replace(",", ".");

                if(Fruitage.isDollarOrEuro(currency)) {
                    $('.uninvoiced-report tfoot').find('.ur-unamount').after('<td class="ur-unamount total-amount">'+currency+' '+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+'</td>');
                } else {
                    $('.uninvoiced-report tfoot').find('.ur-unamount').after('<td class="ur-unamount total-amount">'+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+' '+currency+'</td>');
                }

            }

        },

        reportsTime: function() {

            if($('.reports-summary').length) {

                // Top balances
                $('.reports-summary').find('.billable-amount').each(function() {

                    var withoutVAT = $(this).find('h3').text();
                    var currency = Fruitage.getCurrency(withoutVAT);
                    var withoutVAT_number = withoutVAT.replace(/[^0-9\.,\n]|,[^0-9]/g, "").replace(",", ".");

                    if(Fruitage.isDollarOrEuro(currency)) {
                        $(this).find('h3').after('<h4 style="color: #aaa; font-size: 150%;">'+currency+' '+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+'<span style="font-size: 45%;">(Without VAT)</span><h4>');
                    } else {
                        $(this).find('h3').after('<h4 style="color: #aaa; font-size: 150%;">'+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+' '+currency+'<span style="font-size: 45%;">(Without VAT)</span><h4>');
                    }


                });


                // Header
                $('.user-table thead, .client-table thead').find('tr').each(function(){
                    $(this).find('.td-billable-amount').after('<th><span>Balance without VAT</span></th>');
                });

                // Body
                $('.user-table tbody, .client-table tbody').find('tr').each(function() {
                    
                    var withoutVAT = $(this).find('td.td-billable-amount').text();
                    var currency = Fruitage.getCurrency(withoutVAT);
                    var withoutVAT_number = withoutVAT.replace(/[^0-9\.,\n]|,[^0-9]/g, "").replace(",", ".");
                    
                    if(Fruitage.isDollarOrEuro(currency)) {
                        $(this).find('.td-billable-amount').after('<td class="td-billable-amount">'+currency+' '+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+'</td>');
                    } else {
                        $(this).find('.td-billable-amount').after('<td class="td-billable-amount">'+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+' '+currency+'</td>');
                    }
                });

                // Totals
                var withoutVAT = $('.user-table tfoot, .client-table tfoot').find('.td-billable-amount').text();
                var currency = Fruitage.getCurrency(withoutVAT);
                var withoutVAT_number = withoutVAT.replace(/[^0-9\.,\n]|,[^0-9]/g, "").replace(",", ".")

                if(Fruitage.isDollarOrEuro(currency)) {
                    $('.user-table tfoot, .client-table tfoot').find('.td-billable-amount').after('<td class="td-billable-amount">'+currency+' '+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+'</td>');
                } else {
                    $('.user-table tfoot, .client-table tfoot').find('.td-billable-amount').after('<td class="td-billable-amount">'+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+' '+currency+'</td>');
                }

            }


        },

        estimates: function() {

            if($('.estimates_won table').length) {

                $('.estimates_won table tbody, .estimates_dashboard_container tbody').find('tr').each(function() {
                    
                    var withoutVAT = $(this).find('td.amount').text();
                    var currency = Fruitage.getCurrency(withoutVAT);
                    var withoutVAT_number = withoutVAT.replace(/[^0-9\.,\n]|,[^0-9]/g, "").replace(",", ".");                    
                    if(Fruitage.isDollarOrEuro(currency)) {
                        $(this).find('.amount').after('<td class="amount">'+currency+' '+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+'</td>');
                    } else {
                        $(this).find('.amount').after('<td class="amount"><a>'+Fruitage.numberWithCommas(parseFloat(withoutVAT_number*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+' '+currency+'<span style="font-size: 60%; font-weight: normal"> (Without VAT)</span></a></td>');
                    }
                });

            }

        }

    }

    $(function() {
        Fruitage.init();
    });

}(jQuery));