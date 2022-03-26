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
	return gulp.src('app/like-remont2/scss/**/*.scss') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 5 versions'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/like-remont2/result/css')) // Выгружаем результата в папку app/like-remont2/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
	});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app/like-remont2/result' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});


var fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function() {
	gulp.src(['app/like-remont2/*.html'])
	.pipe(fileinclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest('app/like-remont2/result'));
});

/*gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/like-remont2/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'app/like-remont2/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/like-remont2/js')); // Выгружаем в папку app/like-remont2/js
	});*/

/*gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/like-remont2/css/libs.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('app/like-remont2/css')); // Выгружаем в папку app/like-remont2/css
	});*/

gulp.task('watch', ['browser-sync', 'fileinclude'], function() {
	gulp.watch('app/like-remont2/scss/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/like-remont2/*.html', ['fileinclude'], browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/like-remont2/var/*.html', ['fileinclude'], browserSync.reload); // Наблюдение за HTML файлами var
	gulp.watch('app/like-remont2/result/*.html', browserSync.reload); // Наблюдение за HTML файлами в result
	gulp.watch('app/like-remont2/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('app/like-remont2/result/img/**/*') // Берем все изображения из app
		.pipe(cache(imagemin({  // Сжимаем их с наилучшими настройками с учетом кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('app/like-remont2/result/img')); // Выгружаем на продакшен
	});

gulp.task('build', ['clean', 'img', 'sass', 'fileinclude'], function() {

/*	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'app/like-remont2/css/main.css',
		'app/like-remont2/css/libs.min.css'
		])
	.pipe(gulp.dest('dist/css'))*/

	var buildFonts = gulp.src('app/like-remont2/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/like-remont2/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	/*var buildHtml = gulp.src('app/like-remont2/*.html')
	.pipe(gulp.dest('dist'));*/
	 // Переносим HTML в продакшен

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
