/**
 * Created by 西兰花的春天 on 2017/1/6.
 */
module.exports = function( grunt )
{
	grunt.initConfig( {
		/* 任务配置，所有插件的配置信息 */
		pkg: grunt.file.readJSON( "package.json" ),

		/*=======  less插件配置的配置信息 =======*/
		less: {
			main: {
				expand: true,
				cwd: 'src/css/less/',
				src: [ '*.less'],
				dest: 'dist/css/less(css)/',
				ext: '.css'
			}
		},

		/*=======  压缩css，cssmin插件的配置信息 =======*/
		cssmin: {
			/*压缩 CSS 文件为 .min.css */
			options: {
				keepSpecialComments: 0
			},
			minify: {
				expand: true,
				cwd: 'src/css/',
				src: [ '**/*.css', '!**/*.min.css' ],
				dest: 'dist/css',
				ext: '.min.css'
			},
			/*  合并CSS  */
			merge: {
				files: {
					/* 合并指定目录下   所有的CSS文件 */
					'dist/css/merge/all/all.css': [ 'dist/css/**/*.css']
				}
			}
		},

		/*======= 压缩js，uglify插件的配置信息 =======*/
		uglify: {
			options: {
				//在所有生成的文件上方加上 时间
				banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			minjs: {
				files: [ {
					expand: true,		// 启用下面的选项
					cwd: 'src/js/',		// 指定待压缩的文件路径
					src: [ '**/*.js', '!**/*.min.js' ], // 匹配相对于cwd目录下的所有js文件(排除.min.js文件)
					dest: 'dist/js',	// 生成的压缩文件存放的路径
					ext: '.min.js'		// 生成的文件都使用.min.css替换原有扩展名，生成文件存放于dest指定的目录中
				} ]
			},
			/*  合并js  */
			merge: {
				files: {
					/* 合并指定目录下   所有的js文件 */
					'dist/js/merge/all/all.js': [ 'dist/js/**/*.js']
				}
			}
		},

		/*  配置插件(图片压缩)  */
		imagemin: {
			dynamic: {
				options: {
					optimizationLevel: 3
				},
				files: [
					{
						expand: true, // 开启动态扩展
						cwd: "src/", // 当前工作路径
						src: [ "**/**/*.{png,jpg,gif}" ],
						dest: "dist/" // 输出目录
					}
				]
			}
		},

		/*======= 监控文件变化并执行相应任务 =======*/
		watch: {
			/*  监听当Gruntfile.js改变时，重新刷新加载  */
			configFiles: {
				files: [ 'Gruntfile.js'],
				options: {
					reload: true
				}
			},
			less: {
				files: [ 'src/css/less/*.less' ],
				tasks: [ 'newer:less' ],
				options: {
					spawn: false,
					debounceDelay:5000
				}
			},
			css: {
				files: [ 'src/css/**/*.css' ],
				tasks: [ 'newer:cssmin' ],
				options: {
					spawn: false,
					debounceDelay:5000
				}
			},
			js: {
				files: [ 'src/js/**/*.js' ],
				tasks: [ 'newer:uglify' ],
				options: {
					spawn: false,
					debounceDelay:5000
				}
			}
		}
	} );

	//告诉grunt当我们在终端中输入grunt时需要做些什么
	grunt.registerTask( 'default', [], function()
	{
		//告诉grunt我们将使用插件
		grunt.loadNpmTasks( 'grunt-contrib-less' );
		grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
		grunt.loadNpmTasks( 'grunt-contrib-uglify' );
		grunt.loadNpmTasks( 'grunt-contrib-imagemin' );
		grunt.loadNpmTasks( 'grunt-contrib-watch' );
		grunt.loadNpmTasks( 'grunt-newer' );
		grunt.loadNpmTasks( 'grunt-bowercopy' );
		grunt.loadNpmTasks( 'grunt-bower-task' );

		//需要执行哪些任务（注意先后顺序）
		grunt.task.run(
			'newer:less',
			'newer:cssmin',
			'newer:uglify',
			'imagemin',
			'watch'
		);
	} );

};