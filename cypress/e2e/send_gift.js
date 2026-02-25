import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("Jag är på en profil och ser inte pressent formuläret", () => {
	cy.visit("http://localhost:5173/#/profile/6");
	cy.get("#tabArea").should("not.exist");
	cy.get("#giftBtn").should("be.visible");
});

Given("Jag ser formuläret och skicka knappen är disabled", () => {
	cy.visit("http://localhost:5173/#/profile/6");
	cy.get("#giftBtn").click();
	cy.get("#formButton").should("be.disabled");
	cy.get("#formName").find("label").should("have.class", "text-danger");
	cy.get("#formSelection").find("label").should("have.class", "text-danger");
	cy.get("#formMsg").find("label").should("have.class", "text-danger");
});

Given("Jag har fyllt i formuläret", () => {
	cy.visit("http://localhost:5173/#/profile/6");
	cy.get("#giftBtn").click();
	cy.get("#userName").type("Hanna");
	cy.get("#giftOption").select("Meme");
	cy.get("#message").type("Här får du en pressent!");
	cy.get("#formButton").should("be.visible");
});

When("Jag klickar på skicka pressent knappen", () => {
	cy.get("#giftBtn").click();
});

When("Jag fyller i formuläret", () => {
	cy.get("#userName").type("Hanna");
	cy.get("#formName").find("label").not("have.class", "text-danger");
	cy.get("#giftOption").select("Meme");
	cy.get("#formSelection").find("label").not("have.class", "text-danger");
	cy.get("#message").type("Här får du en pressent!");
	cy.get("#formMsg").find("label").not("have.class", "text-danger");
});

When("Jag inte fyller i formuläret korrekt", () => {
	cy.get("#userName").type("H");
	cy.get("#giftOption").select("Meme");
	cy.get("#message").type("JK");
});

When("Jag trycker på skicka", () => {
	cy.get("#formButton").click();
});

Then("Pressent formulär syns", () => {
	cy.get("#tabArea").should("be.visible");
	cy.get("#giftBtn").should("be.disabled");
});

Then("Skicka knappen är enabled", () => {
	cy.get("#formButton").should("be.visible");
});

Then("Jag kan ej tryck på skicka", () => {
	cy.get("#formName").find("label").should("have.class", "text-danger");
	cy.get("#formSelection").find("label").not("have.class", "text-danger");
	cy.get("#formMsg").find("label").should("have.class", "text-danger");
	cy.get("#formButton").should("be.disabled");
});

Then("Jag får en visuell bekräftelse vad som skickas", () => {
	cy.get('[data-testid="sendGift"]').contains("Meme");
	cy.get('[data-testid="sendTo"]').contains("Boel Sjögren");
	cy.get('[data-testid="sendMgs"]').contains("Här får du en pressent!");
	cy.get('[data-testid="sendUser"]').contains("Hanna");
});
