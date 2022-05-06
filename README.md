# PC-Builder

https://pcbuilder-web.web.app/

## Kedves javító Kollega!

A projekt egy számítógép konfiguráció összeállító webalkalmazást valósít meg.  
Az alábbiakban részletezem a program működését a könnyebb használat érdekében.

### Rövid leírás

A főoldalon jelennek meg a konfigurációhoz jelenleg kiválasztott komponensek egy táblázatban.  
A jobb felső sarokban lévő **Login** gomb segítségével van lehetőség új felhasználót regisztrálni,  illetve belépni.  

Regisztráció során minden mező kitöltése kötelező, ha a bevitt adat formátuma nem megfelelő,  
vagy ha a megadott felhasználónév vagy e-mail cím foglalt, arról egy dialogban értesítést kap a felhasználó.  

Bejelentkezni van lehetőség felhasználónév és jelszó, vagy pedig e-mail cím és jelszó használatával.   
Bejelentkezés után a bal felső sarokban lévő **hamburger menü** megnyitásával a sidenavban megjelenik egy **My Builds** menüpont,  
ami a felhasználó által összeállított konfigurációkat megjelenítő oldalra vezet. Itt van lehetőség **szerkeszteni**, és **törölni** a mentett buildeket.  
Szerkesztés esetén a felhasználó visszakerül a főoldalra, és a kiválasztott hardverek listája kicserélődik a választott buildnek megfelelőkkel.  

Nem megfelelő útvonal esetén egy 404-es oldalra kerül átirányításra a kérés, illetve vendég felhasználó nem képes megtekinteni a **My Builds** oldalt,
valamint bejelentkezett felhasználó nem tud a **Login** oldalra navigálni.

### Build összeállítása

A főoldalon van lehetőség a konfiguráció összeállítására, ennek mentéséhez viszont előbb regisztrálni kell, majd bejelentkezni.  
A komponenseknek megfelelő gombokra kattintva az adott típusú termékeket listázó oldalra kerül a felhasználó.  
Terméket hozzáadni az összeállításhoz az **Add to build** gombbal lehet, ilyenkor visszakerülünk a főoldalra, és a listában megjelenik a termék.  

A konfigurációból összetevőt eltávolítani a termék sorában a jobb szélső cellában megjelenő **kuka** ikon segítségével lehet.  
Mentés a **Save build** gomb segítségével végezhető el (ha van kiválasztva legalább egy hardver).  

Ezután felugrik egy dialógusablak ahol ki kell választani, hogy **Új konfiguráció**t mentünk-e éppen (Create a new build),  
vagy már egy **meglévő konfiguráció**t szeretnénk módosítani (Overwrite). Fontos, hogy mindkét esetben az input mezőbe írni kell egy nevet.
Meglévő összeállítás felülírásakor a lenti legördülő listából kell egy elemet választani, ilyenkor a fenti szövegbeviteli mező tartalma lecserélődik a
kiválasztott build nevére, annek átírásával van lehetőség átnevezni azt.
  
---
  
 **<p align="center">❔❔ Értékelési segédlet ❔❔</p>**
 1. ✅ Fordítási hiba nincs
 2. ✅ Futtatási hiba nincs
 3. ✅ Firebase Hosting URL
 4. ✅ Adatmodell definiálása (**shared/model**)
 5. ✅ Alkalmazás felbontása megfelelő számú komponensre  
       (Az index komponens initializeData() metódusa meghaladja a 400 karaktert, de ez csak statikus adatfeltöltésre kell, nincs használva)
 6. ❔  Reszponzív, mobile-first felület
 7. ✅ Legalább 2 különböző attribútum direktíva használata
 8. ✅ Legalább 2 különböző strukturális direktíva használata
 9. ✅ Adatátadás szülő és gyermek komponensek között (**menu.component.ts**, **build-viewer.component.ts**, **build-selector.component.ts**, **...**)
 10. ✅ Legalább 10 különböző Material elem (**Table**, **Sidenav**, **Spinner**, **Snackbar**, **Button**, **Icon**, **Dialog**, **RadioButton**, **Select**, **Card**, **...**)
 11. ✅ Adatbevitel Angular form-ok segítségével megvalósítva
 12. ✅ Legalább 1 saját Pipe osztály írása és használata (**shared/pipes/route-format.pipe.ts** --> **build-table.component::addNewComponent**)
 13. ✅ Legalább 2 különböző Lifecycle Hook használata (**build-table.component::ngAfterViewInit**, **build-viewer.component::ngOnChanges**)
 14. ✅ CRUD műveletek mindegyike megvalósult
 15. ✅ CRUD műveletek service-ekbe vannak kiszervezve és megfelelő módon injektálva lettek
 16. ✅ Firestore adatbázis használata
 17. ✅ Legalább 2 komplex Firestore lekérdezés (**build.service::getBuildsForUser**, **auth.service::getUserByEmail**, **...**)
 18. ✅ Legalább 4 különböző route a különböző oldalak eléréséhez
 19. ✅ Legalább 2 route levédése azonosítással (**/accounts/login**, **/builds**)

###### ❔: Nem vagyok benne biztos, hogy jár-e a pont / Részleges megoldás

###### ✅: Megvalósítva
