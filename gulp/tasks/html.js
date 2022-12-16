import fileInclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import gulpVersionNumber from "gulp-version-number";

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'HTML',
				message: "Error: <%= error.message %>"
			}

			)
		))
		.pipe(fileInclude())
		.pipe(app.plugins.replace(/@img\//g, "img/"))
		.pipe(webpHtmlNosvg())
		.pipe(gulpVersionNumber({
			'value': '%DT%',
			'append': {
				'key': '_v',
				'cover': 0,
				'to': [
					'css',
					'js',
				]
			},
			'output': {
				'file': 'version.json'
			}

		}))
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream())
}