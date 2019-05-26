# Changelog

### Woche 1
Typescript und Angular mit Tutorials und Literatur kennengelernt und experimentiert
* https://www.tutorialspoint.com/typescript/
* https://www.youtube.com/watch?v=uo4PWU-R96k&list=PLNmsVeXQZj7pwHqtQSBXGBUNkyGGOJQXf
* https://angular.io/tutorial
* https://www.udemy.com/the-complete-guide-to-angular-2
* https://www.youtube.com/playlist?list=PL6gx4Cwl9DGBYxWxJtLi8c6PGjNKGYGZZ
* Angular: Das große Handbuch zum JavaScript-Framework. Einführung und fortgeschrittene TypeScript-Techniken

### Woche 2
Kotlin, Gradle und Spring Boot kennengelernt und experimentiert
* https://spring.io/guides/gs/spring-boot/
* https://spring.io/guides/gs/rest-service/
* https://www.baeldung.com/spring-boot
* https://play.kotlinlang.org/koans/overview
* Kotlin in Action von Dmitry Jemerov, Svetlana Isakova
* https://iwillteachyoukotlin.com/
* https://gradle.org/guides/

### Woche 3
* Backend und Frontend Projekte aufgesetzt
* Buildscript für gemeinsames Bauen, Testen und Deployen
* Continous Integration Pipeline aufgesetzt mit Bitbucket Pipelines, Heroku
* Erstes automatisiertes Deployment auf https://the-retro-board.herokuapp.com/
* Entwurf des Datenmodells

### Woche 4
* Sketch des Retroboard-Screens, identifizieren der Komponenten
* Implementierung der UI-Komponenten und Services für ersten Screen
* Darstellung der Retro-Items und Action-Items aus InMemory-Daten auf dem Screen
* Grundlegendes Styling mit CSS, Farbschema, Logo
* Navigation und Routing

### Woche 5
* Implementierung der REST-Endpoints zum Laden der Retroitems und Actionitems im Backend (mit statischen Fake-Daten)
* Integration von Frontend und Backend für UseCase "Retro-Items anzeigen"
* Formular zum Anlegen von Retro-Items (Frontend)
* Datenzugriffsschicht für Retro-Items im Backend (dynamische Daten in-memory)
* Integration von Frontend und Backend für UseCae "Retro-Item anlegen"
* Gleiches Vorgehen für "Action-Item anlegen"

### Woche 6
* Backend für Retro-Verwaltung (Anlegen/Lesen)
* Liste von Retros im Frontend anzeigen
* Aktuelles Retro auswählbar machen, im RetroService speichern und für andere Services benutzen
* Aktuelle RetroId mit bestehenden REST-Calls ans Backend senden
* Im Backend nach RetroId filtern
* Formular zum Anlegen neuer Retros

### Woche 7
* CSS Styling für mobile View, bessere Aufteilung des verfügbaren Platzes
* Selbständiges Aktualisieren des Retroboards: Wenn anderer Nutzer Retro-Items erstellt, erscheinen diese nach max. 3 Sekunden bei jedem Nutzer
* Retro-Item durch Anklicken als erledigt markieren und auf dem Server updaten
* Board-Spalten dynamisch aus Enum generieren
* MongoDB Setup lokal und cloud (mlab / heroku)
* Datenbankkonfiguration
* In-Memory-Speicher für Retros, RetroItems, ActionItems gegen MongoDB Collections ausgetauscht -> Permanente Persistenz

### Woche 8
* Integration mit Google Signin im Frontend
* Http-Interceptor um Google Access Token mit jedem Request zum Backend zu senden
* Tokeninfo-Endpoint im Backend um Daten aus Token auszulesen
* TokenFilter im Backend verhindert Zugriff ohne validen Token
* Rufe UserEmail zum Token von Google ab und setzen über Filter als Request-Attribut
* Frage Email aus dem Requestattribut im "Create Retro Item"-Endpoint und speichere Email als Autor
* Gib Autor-Feld mit jedem RetroItem ans Frontend zurück