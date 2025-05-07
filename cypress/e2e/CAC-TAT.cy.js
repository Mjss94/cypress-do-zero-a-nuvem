describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach (()  => {
     cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it(' preenche os campos obrigatorios e envia o formulario', () => {
    const longText = Cypress._.repeat('abcdefjhijlmnopqrstuvxz',10)

    cy.get('#firstName').type(' Mary')
    cy.get('#lastName').type ('Jacy')
    cy.get('#email').type('maryjacy2013@gmail.com')
    cy.get('#open-text-area').type (longText, { delay:0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Mary')
    cy.get('#lastName').type('Jacy')
    cy.get('#email').type('maryjacy2013@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
  
    cy.get('.success').should('be.visible') 
    cy.get('#email').type('email-invalido')
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
   
  it('campo telefone continua vazio quando preenchido com um valor não-numerico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })
  it.only('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido', () => {
    cy.get('#firstName').type('Mary')
    cy.get('#lastName').type('Jacy')
    cy.get('#email').type('maryjacy2013@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Mary')
      .should('have.value', 'Mary')
      .clear()
      .should('have.value', '')
  
    cy.get('#lastName')
      .type('Jacy')
      .should('have.value', 'Jacy')
      .clear()
      .should('have.value', '')
  
    cy.get('#email')
      .type('maryjacy@email.com')
      .should('have.value', 'maryjacy@email.com')
      .clear()
      .should('have.value', '')
  
    cy.get('#phone')
      .type('81999999999')
      .should('have.value', '81999999999')
      .clear()
      .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
  
    cy.get('.error').should('be.visible')
  })
  it('envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Maria',
      lastName: 'Jaciara',
      email: 'jaciara_mjss@hotmail.com',
      text: 'Teste.'
    };
  
    cy.fillMandatoryFieldsAndSubmit(data);
  
    cy.get('.success').should('be.visible');
  });
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube') 
      .should('have.value', 'youtube') // valor do atributo "value"
  })
  
  it('seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#product')
      .select('mentoria') // valor do <option>
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', () =>{
    cy.get('#product')
    .select ('Blog')
    .should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .each(typeOfService => {
     cy.wrap(typeOfService)
     .check()
     .should('be.checked')
    })
  })

    it('marca ambos checkboxes, depois desmarca o último', () =>{
      cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
    })
    it('seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json') 
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json')
        })
        it('seleciona um arquivo simulando um drag-and-drop', () => {
          cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(input => {
              expect(input[0].files[0].name).to.equal('example.json')
            })
        })
        
        it('seleciona um arquivo utilizando uma fixture com alias', () => {
          cy.fixture('example.json').as('exampleFile') 
          cy.get('#file-upload')
            .selectFile('@exampleFile') 
            .should(input => {
              expect(input[0].files[0].name).to.equal('example.json') 
            })
        })
        it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
          cy.contains('a', 'Politica de Privacidade')
          .should('have.attr', 'href', 'privacy.html')
          .and('have.attr', 'target', '_blank')
        })
        it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
        cy.contains('a', 'Politica de Privacidade')
        .invoke('removeAttr', 'target')
        .click()

        cy.contains('h1', 'CAT TAT - Politica de Privacidade').should('be.checked')
        })
        it('testa a página da política de privacidade de forma independente', () => {

        })
    })
 })
    
