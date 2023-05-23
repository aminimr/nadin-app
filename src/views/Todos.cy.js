import Todos from './Todos.vue'

describe('<Todos />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-vue
        cy.mount(Todos, { props: { testMode: true } })
        cy.get('#btn-save').click()
        cy.get('#test-result').should('have.text', 'test is done.')
    })
})