var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

var config = {
	mode: {
		css: {
			sprite: 'sprite.svg',
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

gulp.task('beginClean', beginClean)
function beginClean(done) {
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
	if(done) done();
}

gulp.task('createSprite', createSprite);
function createSprite(done) {
	return gulp.src('./app/assets/images/icons/**/*.svg')
	.pipe(svgSprite(config))
	.pipe(gulp.dest('./app/temp/sprite/'));
	if(done) done();
};

gulp.task('copySpriteGraphic', copySpriteGraphic);
function copySpriteGraphic(done) {
	return gulp.src('./app/temp/sprite/css/**/*.svg')
	.pipe(gulp.dest('./app/assets/images/sprites'));
	if(done) done();
}

gulp.task('copySpriteCSS', copySpriteCSS);
function copySpriteCSS(done) {
	return gulp.src('./app/temp/sprite/css/*.css')
	.pipe(rename('_sprite.css'))
	.pipe(gulp.dest('./app/assets/styles/modules'));
	if(done) done();
}

gulp.task('endClean', endClean);
function endClean(done) {
	return del('./app/temp/sprite');
	if(done) done();
}

gulp.task('icons', gulp.series('beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean'));
