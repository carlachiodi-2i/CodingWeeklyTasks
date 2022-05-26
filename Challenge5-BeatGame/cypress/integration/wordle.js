/// <reference types="cypress" />

function enterWord (word) {
    word.split('').forEach(letter => {
        cy.window().trigger('keydown', {key: letter})
    })
    cy.window().trigger('keydown', {key: 'Enter'}).wait(2000)
}

// count unique letters in the word
function countUniqueLetters(word) {
    return new Set(word).size
}

function nextWord (wordList) {
    // Show the number of words in the wordlist, it should decrease in every run
    console.log('word list with %d words', wordList.length)

    // Enter a random word from list
    const word = Cypress._.sample(wordList)
    enterWord(word)
    let count = 0
    const seen = new Set()
    // Check attributes of each letter (Absent, Present or Correct)
    cy.get(`game-row[letters=${word}]`)
        .find('game-tile')
        .each(($tile, position) => {
            const letter = $tile.attr('letter')
            // only consider characters we see for first time
            if (seen.has(letter)) {
                return
            }
            seen.add(letter)
            const evaluation = $tile.attr('evaluation')
            console.log(letter, evaluation)

            //Filter word list based on the evaluation
            if (evaluation === 'absent') {
                // Remove words that contain absent letter
                wordList = wordList.filter((words) => !words.includes(letter))
            } else if (evaluation === 'present') {
                // Keep words that contain present letter
                wordList = wordList.filter((words) => words.includes(letter))
            } else if (evaluation === 'correct') {
                // increase count
                count += 1
                wordList = wordList.filter((words) => words[position] === letter)
            }
    }).then(() => {
        if (count === countUniqueLetters(word)) {
            cy.log('**SOLVED**')
        } else {
            nextWord(wordList)
        }
    })

}

describe('Beat Wordle', () => {
    it('Solve Wordle', () => {
        // Get the list of words from Wordle Request
        cy.intercept('GET', '**/main.*.js', (req) => {
            req.continue((res) => {
                res.body = res.body.replace('=["cigar', '=window.wordList=["cigar',)
            })
        }).as('words')
        // Visit page and try word from word list
        cy.visit('/index.html').its('wordList').then((wordList) => {
            //Close GDPR and Help windows
            cy.get('#pz-gdpr-btn-closex').click().wait(1000)
            cy.get('body > game-app').click().wait(1000)

            nextWord(wordList)
        })  
    })
})