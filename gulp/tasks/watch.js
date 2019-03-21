var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
browserSync = require('browser-sync').create();

gulp.task('watch', function() {

	browserSync.init({
		notify: false,
		server: {
			baseDir: "app"
		}
	});
	
	watch('./app/index.html', function() {
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', function() {
		styles();
		cssInject();
	});
});

gulp.task('cssInject', gulp.series('styles'), cssInject);
	function cssInject(done) {
	return gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream());
	if(done) done();
};

gulp.task('styles', styles);
function styles(done) {
	return gulp.src('./app/assets/styles/styles.css')
	.pipe(postcss([cssImport, mixins, nested, cssvars, autoprefixer]))
	.on('error', function(errorInfo){
		console.log(errorInfo.toString());
		this.emit('end');
	})
	.pipe(gulp.dest('./app/temp/styles'));
	if(done) done();
};