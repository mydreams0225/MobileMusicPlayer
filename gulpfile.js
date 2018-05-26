var gulp = require("gulp");
var htmlclean=require("gulp-htmlclean");
var imagemin=require("gulp-imagemin");
var uglify=require("gulp-uglify");
var stripdebug=require("gulp-strip-debug");//去掉js中的调试语句
var concat=require("gulp-concat");//js文件的拼接
var less=require("gulp-less");//less转成css
var postcss=require("gulp-postcss");
var autoprefixer=require("autoprefixer");
var cssnano=require("cssnano");
var connect=require("gulp-connect"); //模拟简易的服务器


//production生产环境 development //开发环境
var devMode = process.env.NODE_ENV == "development"
// gulp.src()//读文件
// gulp.dest()//写文件
// gulp.task()//任务
// gulp.watch() //监听
var folder={
	src:"./src/",  //开发目录文件夹
	dist:"./dist/"  //压缩打包后的目录文件夹
}


gulp.task("images",function(){
  gulp.src(folder.src + "images/*")
	  .pipe(imagemin())
	  .pipe(gulp.dest(folder.dist+"images"))
})


gulp.task("html",function(){
	var page=gulp.src(folder.src+"html/*") //读文件
	    .pipe(connect.reload())
	if(!devMode){
	    page.pipe(htmlclean())   //压缩html代码	
	}

	    page.pipe(gulp.dest(folder.dist+"html"))//写入文件
})

gulp.task("js",function(){
	var page=gulp.src(folder.src+"js/*")
	     .pipe(connect.reload())
	   if(!devMode){
        page.pipe(stripdebug())
	        .pipe(concat("main.js"))
	        .pipe(uglify()) //js的压缩
	   }
	    page.pipe(gulp.dest(folder.dist+"js"))
})

gulp.task("css",function(){
	var options=[autoprefixer(),cssnano()];
	var page=gulp.src(folder.src+"css/*")
	        .pipe(less())
	         .pipe(connect.reload())
    if(!devMode){
        page.pipe(postcss(options))
    }
	    page.pipe(gulp.dest(folder.dist+"css"))
})

gulp.task("watch",function(){
	gulp.watch(folder.src+"html/*",["html"]);
    gulp.watch(folder.src+"css/*",["css"]);
    gulp.watch(folder.src+"js/*",["js"]);
    gulp.watch(folder.src+"images/*",["images"]);
})

gulp.task("server",function(){
	connect.server({
		port:"8090",
		livereload:true
	});
	
})

gulp.task("default",["html","images","js","css","watch","server"],function(){

})









