@set PASSWORD=%1
@set USER=pfhd_alerya
@set SERVER=pfhd.ftp.infomaniak.com
@set REMOTEFOLDER=web/pawsome/web
@set FULLURL=%USER%@%SERVER%:%REMOTEFOLDER%

@echo ----- DEPLOYING PAWSOME WEBAPP -----
@echo in %FULLURL%

@echo 1) Uploading files...
@rename build current
@pscp -pw %PASSWORD% -r current %FULLURL%
@copy /Y src\config.dev.js src\config.js
@rmdir /S /Q current

@echo All done!