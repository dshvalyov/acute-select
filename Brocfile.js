var concatinate = require('broccoli-concat'),
	mergeTrees = require('broccoli-merge-trees'),
	pickFiles = require('broccoli-static-compiler'),
	angularTemplates = require('broccoli-angular-templates-cache'),
	findBowerFiles = require('broccoli-bower'),
	source = 'src', build = '/dist',
	sourceCss, sourceHtml, sourceJs, sourceTemplates;

/**
* Grab the source JS
*/
sourceJs = pickFiles(source, {
	srcDir: '/',
	files: ['**/*.js'],
	destDir: 'appkit'
});

/**
* Grab templates 
*/
sourceTemplates = angularTemplates(source, {
	srcDir: './acute.select/template',
	distDir: './',
	minify: {
		collapseWhiteSpace: true
	},
	strip: 'src/acute.select.template',
	prepend: '/acute.select/templates.html',
	fileName: 'template.js',
	moduleName: 'acute.select'
});

sourceJs = mergeTrees([sourceJs, sourceTemplates]);

sourceJs = concatinate(sourceJs, {
	inputFiles: ['**/*.js'],
	outputFile: '/acute-select.js'
});

/**
* Grab the source CSS
*/
sourceCss = pickFiles(source, {
	srcDir: '/',
	files: ['**/*.css'],
	destDir: 'appKit'
});

sourceCss = concatinate(sourceCss, {
	inputFiles: ['**/*.css'],
	outputFile: '/acute-select.css'
});

module.exports = mergeTrees([sourceJs, sourceCss])