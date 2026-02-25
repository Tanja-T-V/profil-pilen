
Feature: Skicka Pressent

Det ska finnas en knapp för att skicka en pressent. Användaren ska kunna flylla in sina uppgifter och välja en pressent. Sedan ska användaren kunna skicka pressenten och få bekräftelse på vad som skickas.

Scenario: Se pressent formuläret
    Given Jag är på en profil och ser inte pressent formuläret
    When Jag klickar på skicka pressent knappen
    Then Pressent formulär syns

Scenario: Kunna trycka på skicka knappen
    Given Jag ser formuläret och skicka knappen är disabled
    When Jag fyller i formuläret
    Then Skicka knappen är enabled

Scenario: Inte fyller i formuläret
    Given Jag ser formuläret och skicka knappen är disabled
    When Jag inte fyller i formuläret korrekt
    Then Jag kan ej tryck på skicka

Scenario: Få bekräftelse vad som skickas
    Given Jag har fyllt i formuläret
    When Jag trycker på skicka
    Then Jag får en visuell bekräftelse vad som skickas
