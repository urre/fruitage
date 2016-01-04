var Fruitage = (function() {       
    "use strict";

    var fruitage = {};
   
    fruitage.settings = {
        currencies : ['$', '€']
    };

    fruitage.isDollarOrEuro = function(currency) {
        
        if (fruitage.settings.currencies.indexOf(currency) >= 0) {
            return true;
        }

    };

    fruitage.getCurrency = function(currency) {
        
        return currency.match(/[a-zA-Z]+/g);

    };

    fruitage.numberWithCommas = function(x) {

        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    };

    fruitage.invoicesOverview = function() {

        var balanceCols = $('.js-invoices-table thead tr .col-balance');

        for (var i = 0; i < balanceCols.length; ++i ) {
            var tableHeader = document.createElement("th");
            tableHeader.innerHTML = "Balance without VA";
            balanceCols[i].parentElement.appendChild(tableHeader);
        }

        // $('.js-invoices-table thead tr').each(function() {
        //     $(this).find('.col-balance').after('<th>Balance without VAT</th>');
        // });

        // if($('.js-invoices-table').length) {
        //     $('.js-invoices-table tbody').find('tr').each(function() {
                
        //         var withoutVAT = $(this).find('td').eq(4).find('strong').text();
        //         var currency = Fruitage.getCurrency(withoutVAT);
                
        //         var withoutVAT_number = withoutVAT.replace(" "+currency+"", "").replace(/ /g,'');
        //         var withoutVAT_number_clean = parseFloat(withoutVAT_number.replace(",", "."));

        //         if(Fruitage.isDollarOrEuro(currency)) {
        //             $(this).find('td').eq(4).after('<td ><strong>'+currency+' '+Fruitage.numberWithCommas(parseFloat(withoutVAT_number_clean*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+'<strong></td>');
        //         } else {
        //             $(this).find('td').eq(4).after('<td ><strong>'+Fruitage.numberWithCommas(parseFloat(withoutVAT_number_clean*0.8).toFixed(2)).replace(",", " ").replace(".", ",")+' '+currency+'<strong></td>');
        //         }
        //     });
        // }

    };

    fruitage.init = function() {
        fruitage.invoicesOverview();
    };

    fruitage.init();

    return fruitage;
})();

