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
    //Test results of alert after specific email input
    //123@localz.com, 222@localz.com pass rest should not pass
    //RegExp came from v2.js file in the localz.com
    function validateEmail(x) {
        var re = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return re.test(x);
        };
    it('email-address input1', () => {
        //list of random email
        var email = "";
        var email_id = ["Twdegcde", "?!@#$",  "123", "!darcie", "222"];
        var domain_valid = '@localz.com';
        
        for(var i = 0; i < email_id.length; i++){
            email = email_id[i] + domain_valid;
            cy.get('[data-reactid =".hbspt-forms-0.1:$0.$email.$email.0"]').clear().type(email);
            cy.get('[data-reactid=".hbspt-forms-0.1:$0.0"]').click();
            if(validateEmail(email) == false){
                cy.get('[data-reactid=".hbspt-forms-0.1:$0.$email.3.$0.0"]').contains('Email must be formatted correctly.');
                cy.log('worng format');
                cy.get('[data-reactid=".hbspt-forms-0.5.1.0"]').click();
                cy.get('[data-reactid=".hbspt-forms-0.4.0.0.0"]').contains('Please change your email address to continue.');
            }else if(validateEmail(email) == true){
                cy.log(email + ' is passed');
                cy.get('[data-reactid=".hbspt-forms-0.5.1.0"]').click();
                cy.get('#hs_form_target_footer-module_').contains('Thanks for subscribing! See you in your inbox.');
                cy.visit('https://www.localz.com/');
            };
        };
    });	
    ///id can be tested by regular expression in V2.js
    //how to check domain ..


});