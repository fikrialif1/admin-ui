// dashboard end to end test

const BASE_URL = "http://localhost:5173";

// Fungsi untuk melakukan login melalui antarmuka pengguna
const loginAsStudent = () => {
  cy.visit(BASE_URL);
  cy.url().should("include", "/login");

  cy.get("input#email").should("be.visible").type("hello@example.com");

  cy.get("input#password").should("be.visible").type("123456");

  cy.get("button").contains("Login").click();
};

describe("Dashboard", () => {
  beforeEach(() => {
    // Bersihkan localStorage sebelum setiap test agar tidak ada state login yang tersisa
    cy.clearLocalStorage();
  });

  it("1. should visit the app and redirect to login when not authenticated", () => {
    cy.visit(BASE_URL);
    cy.url().should("include", "/login");
  });

  it("2. should login successfully with valid student credentials", () => {
    loginAsStudent();

    // Tunggu redirect selesai (network request ke backend)
    cy.url({ timeout: 15000 }).should("not.include", "/login");
  });

  it("3. should redirect to dashboard after successful login", () => {
    loginAsStudent();

    cy.url({ timeout: 15000 }).should("eq", `${BASE_URL}/`);
  });

  it("4. should display the navbar after login", () => {
    loginAsStudent();

    // Memastikan sidebar navigasi berhasil ditampilkan
    cy.get("aside", { timeout: 15000 }).should("be.visible");

    // Memastikan menu navigasi tersedia
    cy.get("aside").contains("Overview").should("be.visible");
    cy.get("aside").contains("Expenses").should("be.visible");
  });

  it("5. should display the Overview (balance, goal, upcoming bill) cards", () => {
    loginAsStudent();

    // Memastikan pengguna telah berada di halaman dashboard
    cy.url({ timeout: 15000 }).should("eq", `${BASE_URL}/`);

    cy.contains("Balances", { timeout: 10000 }).should("exist");

    cy.contains("Goals", { timeout: 10000 }).should("exist");

    cy.contains("Upcoming Bill", { timeout: 10000 }).should("exist");
  });

  it("6. should display Upcoming Bill section with data or skeleton", () => {
    loginAsStudent();

    cy.url({ timeout: 15000 }).should("eq", `${BASE_URL}/`);

    // Memastikan bagian Upcoming Bill tersedia
    cy.contains("Upcoming Bill", { timeout: 10000 }).should("be.visible");
  });

  it("7. should navigate to Expenses page and display expenses", () => {
    loginAsStudent();

    cy.url({ timeout: 15000 }).should("eq", `${BASE_URL}/`);

    // Memilih menu Expenses pada sidebar
    cy.get("aside").contains("Expenses").click();

    cy.url().should("include", "/expense");

    // Memastikan halaman Expenses berhasil ditampilkan
    cy.contains("Expenses", { timeout: 15000 }).should("be.visible");
  });

  it("8. should have no uncaught exceptions", () => {
    // Intercept uncaught exceptions — test gagal jika ada JS error fatal
    cy.on("uncaughtException", (err) => {
      // Melempar kembali error agar Cypress menandai pengujian gagal
      throw err;
    });

    loginAsStudent();

    cy.url({ timeout: 15000 }).should("eq", `${BASE_URL}/`);

    // Menunggu seluruh proses permintaan data selesai
    cy.wait(3000);
  });
});