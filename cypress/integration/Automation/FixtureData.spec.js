

import LoginPage from '../PageObject/LoginPage'


describe('Basic Test Case for accessing the data from json file', function () {

    it('A', function () {

        cy.visit('https://v2.matchbets.com/#/sports/161')
        cy.wait(2000)
        cy.contains(' Join Now ').click({ force: true })
        cy.wait(2000)
        
        cy.xpath("//div[@class='form-control username']//input").type('Bravo')
        cy.xpath("//div[@class='form-control password']//input").click({force:true}).type('BRVAAaOO123')
        cy.xpath("//div[@class='form-control passwordConfirmation']//input").type('BRVAAaOO123')
        cy.xpath("//div[@class='form-control email']//input").type('bravo@mailinator.com')
        cy.xpath('//*[text()=" Continue "]').first()
        .click({force:true})





    })




})



