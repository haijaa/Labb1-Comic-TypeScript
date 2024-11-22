# Starta projektet.

Kommandon och hänvisningar nedan refererar till att man kör de via sin terminal.

1. Packa upp zip-fil. Öppna mappen i terminalen och navigera sedan till backend och kör kommandot npm install.
2. Navigera därefter till frontend mappen och kör npm install.
3. Skapa en PSQL databas. Använd filen DB.sql för att göra detta. Denna kommer skapa en liten databas med den information som behövs för att köra projektet.
4. Skapa en .env-fil i backend-mappen (annars kommer detta ge fel när vi försöker köra npm run dev i backend) där du lägger in följande
   PGURI=postgres://DITT_ANVÄNDARNAMN:DITT_LÖSENORD@localhost/slm_comic.
5. Nu är vi redo att gå i front- respektive backend för att köra npm run dev och starta projektet.
6. Börja med att navigera till backend och kör kommandot npm run dev sen gör detsamma i frontend.
7. Nu är projektet startat och man kan trycka CTRL+MOUSE-1 i den url som visas när man kört npm run dev i frontend för att se projektet.

---

# Mål.

GET/SELECT används på första sidan när man startar appen för att hämta de tidningar som finns i databasen allt detta i App.tsx. Man kan även använda pilar till höger och vänster om bild för att navigera till nästa eller föregående.

PROPS använder jag för att skicka data till min Random.tsx för att hantera klick från användare till att visa en slumpad tidning och kör då Math.random på index i min array.

GENERICS har jag i min App.tsx och Modal.tsx. I app så kör jag den för att sätta allComics till array med tillhörande interface som finns strax ovanför i koden. I Modal så ligger den på samma sätt fast för mina publishers.

POST valde jag att använda för första delen av VG-krav där jag tar emot titel, bild (även en preview på den), beskrivning, karaktär och sen får man välja publisher för att man ska kunna publisera en egen tidning. Detta går via Modal.tsx.

INTERFACE använder jag på lite olika sätt, gjorde en mapp i backend som hanterar interfaces till min index.ts i backend för SQL-queries. I frontend har jag ett i app.tsx som även de exporteras och används i komponenten random.
