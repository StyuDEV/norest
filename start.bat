@echo off
REM Double-clique ce fichier pour installer (1re fois) puis lancer le site.
REM Necessite Node.js installe depuis https://nodejs.org

cd /d "%~dp0"

if not exist node_modules (
    echo Installation des dependances, patiente une minute...
    call npm install
    if errorlevel 1 (
        echo.
        echo Echec de l'installation. Verifie que Node.js est installe.
        pause
        exit /b 1
    )
)

echo.
echo Lancement du site sur http://localhost:3000
echo Ferme cette fenetre pour arreter le site.
echo.
call npm run dev
pause
