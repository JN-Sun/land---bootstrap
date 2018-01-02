const gulp = require('gulp'),
			browserSync = require('browser-sync').create(),
			pug = require('gulp-pug'),
			sass = require('gulp-sass'),
			autoprefixer = require('gulp-autoprefixer'),
			cssmin = require('gulp-cssmin'),
			rimraf = require('rimraf'),
			rename = require('gulp-rename'),
			uglify = require('gulp-uglify'),
			concat = require('gulp-concat'),
			sourcemaps = require('gulp-sourcemaps');

/*------------ Server -------------*/
gulp.task('server', function(){
	browserSync.init({
			server: {
				poprt: 9000,
				baseDir: "build"
			}
		});
	gulp.watch('build/**/*').on('change', browserSync.reload);

});


/*------------ Pug compile -------------*/

gulp.task('templates:compile', function buildHtml(){

	return gulp.src('source/template/index.pug')
				 .pipe(pug({
				 	pretty: true
				 	}))
				 .pipe(gulp.dest('build'));
});

/*------------ SASS compile -------------*/

gulp.task('styles:compile', function(){

	return gulp.src('source/styles/main.scss')
					.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        	}))
				 .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
				 .pipe(rename('main.min.css'))
				 .pipe(gulp.dest('build/css'));
});

/*------------ Js -------------*/
gulp.task('js', function(){
	return gulp.src([
			'source/js/init.js',
			'bower_components/jquery/dist/jquery.js',
			'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
			'source/js/common.js',
			'source/js/nav.js',
			'source/js/upfunc.js'
		])
	.pipe(sourcemaps.init())
	.pipe(concat('main.min.js'))
	.pipe(uglify())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('build/js'));
});

/*------------ Delete -------------*/

gulp.task('clean', function del(cb){
	return rimraf('build', cb);
});

/*------------ Copy fonts -------------*/

gulp.task('copy:fonts', function(){
	return gulp.src('./source/fonts/**/*.*')
				 .pipe(gulp.dest('build/fonts'));
});
/*------------ Copy images -------------*/

gulp.task('copy:images', function(){
	return gulp.src('./source/images/**/*.*')
				 .pipe(gulp.dest('build/images'));
});
/*------------ Copy -------------*/

gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

/*------------ Watchers -------------*/
gulp.task('watch', function(){
	gulp.watch('source/template/**/*.pug', gulp.series('templates:compile'));
	//gulp.watch('source/styles/**/*.less', gulp.series('stylesl:compileless'));
	gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
	gulp.watch('source/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series('clean',
		 gulp.parallel('templates:compile', 'styles:compile', 'js', 'copy'),
		 gulp.parallel('watch', 'server')
		)
);