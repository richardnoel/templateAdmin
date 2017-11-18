var gulp = require("gulp");
var concat = require("gulp-concat");
var browserSync = require("browser-sync").create();
var runSequence = require("run-sequence")

gulp.task('build', function () {
	var files = require("./config/files.js");
	gulp.src(files.js)
		.pipe(concat("template.js"))
		.pipe(gulp.dest("dist/template"));
	gulp.src(files.css)
		.pipe(concat("template.css"))
		.pipe(gulp.dest("dist/template"));
	
	gulp.src(files.html)
		.pipe(gulp.dest('dist/'));

	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
});

gulp.task("local-server", function () {
	browserSync.init({
		server: {
			baseDir: "dist/",
			routes: {
				"/jquery/": "lib/jquery/",
				"/bootstrap/": "lib/bootstrap/",
				"/angularjs/": "lib/angularjs/",
				"/chartjs/": "lib/charts/lib/",
				"/fonts/": "lib/fonts/",
				"/webkit/": "lib/webkit/",
				"/template/": "dist/template/",
				"/images/": "dist/images/"
			}
		},
		port: "3333",
		online: false,
		open: true
	});
});


gulp.task('watch', function () {
	var filesWatch = ["src/index.html"];
	var files = require("./config/files.js");
	filesWatch = filesWatch.concat(files.js);
	filesWatch = filesWatch.concat(files.css);
	gulp.watch(filesWatch, function () {
		runSequence('build');
		setTimeout(function(){
			browserSync.reload();
		},500);
	});
})


gulp.task('default', ['build', 'watch', 'local-server']);
