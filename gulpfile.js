var gulp       = require('gulp'), // Подключаем Gulp
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('app/mind/scss/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 5 versions'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/mind/result/css')) // Выгружаем результата в папку app/mind/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
	});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app/mind/result' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});


var fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function() {
	gulp.src(['app/mind/*.html'])
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest('app/mind/result'));
});

/*gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/mind/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'app/mind/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/mind/js')); // Выгружаем в папку app/mind/js
	});*/

/*gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/mind/css/libs.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/mind/css')); // Выгружаем в папку app/mind/css
	});*/

gulp.task('watch', ['browser-sync', 'fileinclude'], function() {
	gulp.watch('app/mind/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/mind/*.html', ['fileinclude'], browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/mind/var/*.html', ['fileinclude'], browserSync.reload); // Наблюдение за HTML файлами var
	gulp.watch('app/mind/result/*.html', browserSync.reload); // Наблюдение за HTML файлами в result
	gulp.watch('app/mind/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('app/mind/result/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('app/mind/result/img')); // Выгружаем на продакшен
	});

gulp.task('build', ['clean', 'img', 'sass', 'fileinclude'], function() {

/*	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/mind/css/main.css',
		'app/mind/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))*/

	var buildFonts = gulp.src('app/mind/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/mind/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	/*var buildHtml = gulp.src('app/mind/*.html')
	.pipe(gulp.dest('dist'));*/
	 // Переносим HTML в продакшен

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
