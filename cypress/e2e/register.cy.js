describe("User register", () => {
  it("should allow user to register with valid credentials", () => {
    cy.viewport(550,750);

    cy.visit("http://localhost:5173/register");
    cy.url().should("include", "/register");

    cy.get("input#name")
      .should("be.visible")
      .type("Muhammad Fikri Alif Karim")
      .should("have.value", "Muhammad Fikri Alif Karim");

    cy.get("input#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com")
      .type("hello@example.com")
      .should("have.value", "hello@example.com");

    cy.get("input#password")
      .should("be.visible")
      .type("123456")
      .should("have.value", "123456");

    cy.get("button").contains("Sign Up").click();

    cy.wait(5000);
  });

  it("should navigate to login page when clicking sign in here", () => {
    cy.viewport(550,750);

    cy.visit("http://localhost:5173/register");
    cy.url().should("include", "/register");

    cy.contains("Sign in here").click();

    cy.url().should("include", "/login");
  });
});