describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  // NOVOS TESTES IMPLEMENTADOS:
  
  it('Adiciona múltiplas tarefas e verifica contagem', () => {
    cy.visit('');
    
    const tasks = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'];
    tasks.forEach(task => {
      cy.get('[data-cy=todo-input]')
        .type(`${task}{enter}`);
    });

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', tasks.length);
  });

  it('Marca tarefa como completa e verifica estado', () => {
    cy.visit('');
    
    cy.get('[data-cy=todo-input]')
      .type('Tarefa para completar{enter}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('not.have.class', 'completed');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.class', 'completed');
  });

  it('Limpa tarefas completas', () => {
    cy.visit('');
    
    // Adiciona e completa duas tarefas
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .each(($el) => {
        cy.wrap($el).click();
      });

    // Verifica que temos 2 tarefas completas
    cy.get('[data-cy=filter-completed-link]').click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);

    // Limpa as completas
    cy.get('.clear-completed').click();

    // Verifica que não há mais tarefas completas
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });
});