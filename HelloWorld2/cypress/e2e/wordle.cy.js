/// <reference types="cypress" />

function enterWord(word) {
    word.split('').forEach(letter => {
        cy.window().trigger('keydown', { key: letter })
    })
    cy.window().trigger('keydown', { key: 'Enter' }).wait(2000)
}

function nextWord(word) {
    enterWord(word)
    if (word !== 'World') nextWord('World')
}

describe('Hello World', () => {
    it('Type Hello World', () => {
        // Visit page and try word from word list
        cy.visit('/index.html')
        cy.get('#pz-gdpr-btn-closex').click().wait(1000)
        cy.get('dialog > div > button.Modal-module_closeIcon__TcEKb').click().wait(1000)
        nextWord('Hello')
    })
})