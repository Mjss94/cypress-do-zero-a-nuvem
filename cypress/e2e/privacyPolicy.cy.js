/// <reference types="cypress" />

describe('Testa a página da Política de Privacidade de forma independente', () => {
    it('deve exibir o conteúdo correto da Política de Privacidade', () => {
      cy.visit('./src/privacy.html') // Caminho direto para a página de política
  
      cy.contains('Talking About Testing').should('be.visible') // Verifica se o conteúdo esperado está na página
    })
  })
  