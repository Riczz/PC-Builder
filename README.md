# PC-Builder

## Kedves javító kollega!

A projekt egy számítógép konfiguráció összeállító alkalmazást valósít meg.  
Az alábbiakban részletezem a program működését a könnyebb használat érdekében.

### Rövid leírás

A főképernyőn jelennek meg az adatbázisban eltárolt konfigurációk.  
Új konfigurációt összeállítani a jobb alsó sarokban található FAB megnyomásával lehet.  
A sidenav megnyitásával (bal fenti hamburger menü ikon) lehet választani a bejelentkezési módok közül.  
Az alsó navbaron keresztül van lehetőség továbbnavigálni a Settings fragmentre, ahol gombnyomásra egy értesítést lehet megjeleníteni.

### Build összeállítása

A konfiguráció összeállításnál először nevet kell adni a buildnek, ezután van lehetőség kiválasztani a különböző hardvereket.  
Ha egy kiválasztott komponenst le szeretnél cserélni, válassz ki egy másikat, vagy nyomd hosszan a hozzá tartozó gombot az eltávolításhoz.  
Mentéshez nyomd meg a vissza gombot, vagy a jobb fenti sarokban lévő mentés ikont.  
Mentésre csak akkor van lehetőség, ha legalább egy komponenst ki lett választva. A felugró dialogban van lehetőség újból átnevezni az összeállítást, vagy elvetni azt.  
A mentett buildeket a főoldalon van lehetőség módosítani, vagy törölni.

---

**<p align="center">❗❗ Fontos tudnivalók ❗❗</p>**
- A termékek listázása és az eltárolt konfigurációk megjelenítése csak bejelentkezés után működnek ❗  
  A Firebase adatbázis beállítása **csak bejelentkezett felhasználóknak** ad engedélyt lekérdezésre és módosításra.
  
- Az adatbázisban nem tárolódnak külön minden felhasználóhoz az adatok.  
  Egy nagy kollekció van, ezen történik minden módosítás.
  
- A GitHub-os bejelentkezés nem feltétlen működik minden esetben, ajánlott a Google, vagy a többi másik bejelentkezési  
  módot használni. ❌
  
---
  
 **<p align="center">❔❔ Értékelési segédlet ❔❔</p>**
 1. ✅ Fordítási hiba nincs
 2. ✅ Futtatási hiba nincs
 3. ✅ Firebase autentikáció meg van valósítva
 4. ✅ Adatmodell definiálása (**model package**)
 5. ✅ Legalább 3 különböző activity használata (**MainActivity**, **CreateBuildActivity**, **RegisterLoginActivity**, **SelectComponentActivity**)
 6. ✅ Beviteli mezők beviteli típusa megfelelő (**res/register_form.xml**, **res/login_form.xml**, **CreateBuildActivity::showSavePrompt**)
 7. ✅ ConstraintLayout és még egy másik layout típus használata (**DrawerLayout**, **CoordinatorLayout**, **ConstraintLayout**, **LinearLayout**, **...**)
 8. ✅ Reszponzív
 9. ✅ Legalább 2 különböző animáció használata (**res/authentication_form.xml**: **slide_in_left**, **slide_out_right**)
 10. ✅ Intentek használata: navigáció meg van valósítva az activityk között (minden activity elérhető)
 11. ✅ Legalább egy Lifecycle Hook használata a teljes projektben (**onActivityResult**, **onCreateView**, **...**)
 12. ❔ Legalább egy olyan androidos erőforrás használata, amihez kell android permission (**android.permission.INTERNET**)
 13. ✅ Legalább egy notification vagy alam manager vagy job scheduler használata (**notification package**)
 14. ❔ CRUD műveletek mindegyike megvalósult és műveletek service-(ek)be vannak kiszervezve (AsyncTasks) (**AsyncTaskok hiányoznak**)
 15. ❔ Legalább 2 komplex Firestore lekérdezés megvalósítása, amely indexet igényel (**dao package**)

###### ❔: Nem vagyok benne biztos, hogy jár-e a pont / Részleges megoldás

###### ✅: Megvalósítva
