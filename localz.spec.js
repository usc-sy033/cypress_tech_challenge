describe('Localz home page', function(){
    it('Visit the URL', function(){
        cy.visit('https://www.localz.com/');
    });	

    //check search bar input
    // no data id or element id found, therefore using css class
    it('serach-bar-input', () => {
        cy.get('*[class^="atmc-header_right"]').click();
        cy.get('input[name="term"]').type('e{enter}');
        cy.get('#hsresults').within(() => {
            return cy.contains('e');
        });
    });
    it('serach-bar-no-input', () => {
        cy.get('*[class^="atmc-header_right"]').click();
        cy.get('input[name="term"]').clear().type('{Enter}');
    });
    it('serach-bar-no-result-input', () => {
        cy.get('*[class^="atmc-header_right"]').click();
        cy.get('input[name="term"]').type('!{enter}');
        cy.get('#hs_cos_wrapper_search_results').contains('Try rewording your query, or browse through our site.');
    });
    
    
    //check email

    it('Visit the URL', function(){
        cy.visit('https://www.localz.com/');
    });	
    //Test
    it('email-address input1', () => {
        //list of random email
        var email = "";
        var email_id = ["!darcie", "Twdegcde", "ttt", "0!@3z", "?!@#$" ];
        var domain_valid = '@localz.com';
        for(var i = 0; i < email_id.length; i++){
            email = email_id[i] + domain_valid;
            cy.get('[data-reactid =".hbspt-forms-0.1:$0.$email.$email.0"]').clear().type(email);
            function validateEmail(x) {
                var re = new RegExp("/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/");
                return re.test(x);
                };
            if(validateEmail(email) == false){
                cy.get('[data-reactid=".hbspt-forms-0.1:$0.$email.3.$0.0"]')
                .contains('Email must be formatted correctly.');
            }
        };
    });	



});