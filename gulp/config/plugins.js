import replace from "gulp-replace"; //Поиск и замена
import plumber from "gulp-plumber"; //Обработка ошибок 
import notify from "gulp-notify"; // Сообщения при ошибке
import browsersync from "browser-sync"; // Локальный сервер
import newer from "gulp-newer"; //Проверка обновлений 
import ifPlugins from "gulp-if" //Условное ветвление 

export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugins,
}