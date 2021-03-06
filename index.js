#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const path = require('path');
const commander = require('commander');




const pkgJson = require('./package.json');
const files = require('./lib/files');
const inquirer = require('./lib/inquire');
const jsonCreater = require('./lib/createRepo');

const Init = async (projectName) => {

	clear();
	console.log(
		chalk.yellow(
			figlet.textSync('Webinit', { horizontalLayout: 'standard' })
		)
	);

	let currentFolder = path.resolve(process.cwd());
	
	if(files.directoryExists(path.resolve(currentFolder,projectName))){
		console.log(
			chalk.red('Project Already Created!')
		);
		process.exit();
	}
	
	

	


  const Options = await inquirer.askQuestions(projectName);

  if (Options) {
	files.createDirectory(currentFolder,Options.projectName);
	currentFolder = path.join(currentFolder,Options.projectName);

	console.log(chalk.green.bold('All set initialising project'));

	jsonCreater.createPackageJson(Options,currentFolder)
		.then(() => jsonCreater.createTemplateProject(currentFolder))
		.then(() => jsonCreater.generateConfigJs(Options,currentFolder))
		.then(devdepend => jsonCreater.addDevDependencies(Options,currentFolder,devdepend))
		.then(() => jsonCreater.addDependencies(Options,currentFolder))
		.then(() => jsonCreater.createEsLintjson(Options,currentFolder))
		.then(() => {
			console.log(chalk.green.bold('All Done!'));
			console.log(chalk.green.bold(`run cd ${projectName}`));
		})
		.catch(err => {
			console.log(chalk.red.bold(err));
		});
	}
	
};

//Init();

//const program = 
new commander.Command('webinit')
	.version(pkgJson.version,'-V, --version')
	.arguments('<project-directory>')
	.usage(`${chalk.green('<project-directory>')} [options]`)
	.action(name => {
		Init(name);
	})
	.parse(process.argv);



