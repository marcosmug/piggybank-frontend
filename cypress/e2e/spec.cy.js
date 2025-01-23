describe("Overboeken", () => { //test scenario title
  it("Geld overmaken van een rekening waarbij het saldo hoger is dan €0.", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(2).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.visit("http://localhost:3000/transfer"); //gaat naar de link transfer
    cy.get("select[name=toaccount]").select(3); //kiest de rekening van sophie index 3 = sophie
    cy.get("input#amount").type("100"); //type de geld in die in de transaction moet komen
    cy.get("textarea[name=description]").type("Dit is een overboek bericht"); //vult de omschrijving in
    cy.get("button[type=submit]").click();  //selecteert de button en clickt erop
    cy.get("h1").should("contain", "Gelukt!") //checkt als er een h1 tekst komt waar staat "Gelukt!"
  })

  it("omrekenen naar euros pond of dollars", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(2).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.visit("http://localhost:3000/transfer"); //gaat naar de link transfer
    cy.get("select[name=toaccount]").select(3); //kiest de rekening van sophie index 3 = sophie
    cy.get("select.transfer__currency").select("USD");
    cy.get("input#amount").type("100"); //type de geld in die in de transaction moet komen
    cy.get("textarea[name=description]").type("Dit is een overboek bericht"); //vult de omschrijving in
    cy.get("button[type=submit]").click();  //selecteert de button en clickt erop
    cy.get("h1").should("contain", "Gelukt!") //checkt als er een h1 tekst komt waar staat "Gelukt!"
    cy.visit("http://localhost:3000/");
    cy.get("span.transaction__amount").should("contain", "$"); //zoekt dollar teken in de span(melding) vind het niet en zegt dat het test faalt
  })

  it("Meer geld overmaken dan op de rekening staat zodat je in de min staat", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(2).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.visit("http://localhost:3000/transfer"); //gaat naar de link transfer
    cy.get("select[name=toaccount]").select(3); //kiest de rekening van sophie index 3 = sophie
    cy.get("input#amount").type("8000"); //type de geld in die in de transaction moet komen
    cy.get("textarea[name=description]").type("Dit is een overboek bericht om in de min te gaan"); //vult de omschrijving in
    cy.get("button[type=submit]").click();  //selecteert de button en clickt erop
    cy.get("h1").should("contain", "Gelukt!") //checkt als er een h1 tekst komt waar staat "Gelukt!"
    cy.visit("http://localhost:3000/");
    cy.get("div.accounts__account-balance").should("contain", "-");//checkt op - getal
  })

  it("Meer geld overmaken dan op de rekening staat", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(2).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.visit("http://localhost:3000/transfer"); //gaat naar de link transfer
    cy.get("select[name=toaccount]").select(3); //kiest de rekening van sophie index 3 = sophie
    cy.get("input#amount").type("7000"); //type de geld in die in de transaction moet komen
    cy.get("textarea[name=description]").type("Dit is een overboek bericht om meer geld te overmaken dan je eigenlijk hebt"); //vult de omschrijving in
    cy.get("button[type=submit]").click();  //selecteert de button en clickt erop
    cy.get("h1").should("contain", "Gelukt!") //checkt als er een h1 tekst komt waar staat "Gelukt!"
  })

  it("Je gaat geld overmaken maar je typt geen bedrag in", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(2).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.visit("http://localhost:3000/transfer"); //gaat naar de link transfer
    cy.get("select[name=toaccount]").select(3); //kiest de rekening van sophie index 3 = sophie
    cy.get("textarea[name=description]").type("Je gaat geld overmaken maar je typt geen bedrag in"); //vult de omschrijving in
    cy.get("button[type=submit]").click();  //selecteert de button en clickt erop, test faalt want je moet persee een bedrag invullen
    cy.get("#amount").invoke("prop","validationMessage").should("not.be.empty");
  })

  it("Je gaat geld overmaken maar je laat de rekening leeg", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(2).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.visit("http://localhost:3000/transfer"); //gaat naar de link transfer
    cy.get("input#amount").type("7000"); //type de geld in die in de transaction moet komen
    cy.get("textarea[name=description]").type("Dit is een overboek bericht met geen rekening"); //vult de omschrijving in
    cy.get("button[type=submit]").click();  //selecteert de button en clickt erop, test faalt want je moet een rekening kiezen
    cy.get("select[name=toaccount]").invoke("prop","validationMessage").should("not.be.empty");
  })

  it("Je gaat geld overmaken maar je laat de omschrijving venster leeg", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(2).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.visit("http://localhost:3000/transfer"); //gaat naar de link transfer
    cy.get("select[name=toaccount]").select(3); //kiest de rekening van sophie index 3 = sophie
    cy.get("input#amount").type("1000"); //type de geld in die in de transaction moet komen
    cy.get("button[type=submit]").click();  //selecteert de button en clickt erop, het faalt want je moet een omschrijving invullen
    cy.get("textarea[name=description]").invoke("prop","validationMessage").should("not.be.empty");
  })
});

describe("Account", () => { //test scenario title
  it("Je gaat inloggen op melvins account", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(0).click(); //clickt op de account van melvin index 0 = cem vervolgens clickt erop
    cy.get(".accounts__account-name").should("contain","Melvin");
  })

  it("Je gaat inloggen op Sara account", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(1).click(); //clickt op de account van sara index 1 = cem vervolgens clickt erop
    cy.get(".accounts__account-name").should("contain","Sara");
  })

  it("Je gaat inloggen op Cem account", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(2).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.get(".accounts__account-name").should("contain","Cem");
  })

  it("Je gaat inloggen op Sophie account", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(3).click(); //clickt op de account van sophie index 3 = cem vervolgens clickt erop
    cy.get(".accounts__account-name").should("contain","Sophie");
  })

  it("Je gaat uitloggen uit sophies account", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(3).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.get(".accounts__account-name").should("contain","Sophie");
    cy.get(".app__logout").click();
  })
})

describe("Instellingen", () => { //test scenario title
  it("je wilt de naam van je rekening veranderen", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(0).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.visit("http://localhost:3000/settings");
    cy.get("input#accountName").clear().type("Melvin V");
    cy.get("button[type=submit]").click();
    cy.get("h1").should("contain","Hoppa!");
    cy.visit("http://localhost:3000/"); //gaat main pagina
    cy.get(".accounts__account-name").should("have.text","Melvin V");//faalt want naam veranderd niet
  })

  it("je wilt de naam van je rekening veranderen naar een lege veld", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(0).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.visit("http://localhost:3000/settings");
    cy.get("input#accountName").clear();
    cy.get("button[type=submit]").click();
    cy.get("#accountName").invoke("prop","validationMessage").should("not.be.empty");
  })
})

describe("Transactie", () => { //test scenario title
  it("Transactie zien zonder in te loggen", () => { //test beschrijving
    cy.visit("http://localhost:3000/transactions");
    cy.get("h1").should("contain","Welkom");//faalt want je moet inloggen om te zien
  })

  it("je wilt je laatste 3 transacties zien", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(0).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.get("h2").should("contain", "3");
  })

  it(" Je wilt al je laatste transacties zien", () => { //test beschrijving
    cy.visit("http://localhost:3000/login"); //gaat naar login url
    cy.get("button.login__account").eq(0).click(); //clickt op de account van cem index 2 = cem vervolgens clickt erop
    cy.visit("http://localhost:3000/transactions");
    cy.get("h1").should("contain", "overzicht");
  })
})