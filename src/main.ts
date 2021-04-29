import * as yargs from 'yargs';
import * as fs from 'fs';
import {spawn} from 'child_process';

yargs.command({
  command: 'list',
  describe: 'list filenames from directory',
  builder: {
    directory: {
      describe: 'Directory',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.directory === 'string') {
      fs.readdir(argv.directory, (err, files) => {
        if(err) {
          console.log(`Error, directory ${argv.directory} not found`)
        } else {
          console.log(`${argv.directory}:`)
          files.forEach(file => {
            console.log(`- ${file}`);
          });
        }
      });
    }
  }
});

yargs.command({
  command: 'show',
  describe: 'show filename´s content from directory and extra information',
  builder: {
    directory: {
      describe: 'Directory',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.directory === 'string') {
      fs.readdir(argv.directory, (err, files) => {
        if(err) {
          console.log(`Error, directory ${argv.directory} not found`)
        } else {
          console.log(`${argv.directory}:`)

          files.forEach(file => {
            fs.readFile(`./${argv.directory}/${file}`, (_, data) => {
              console.log(`${file} content:`)
              console.log(data.toString());
              let wcOutput = '';
              const wc = spawn('wc', [`./${argv.directory}/${file}`]);
              wc.stdout.on('data', (piece) => wcOutput += piece);
              wc.on('close', () => {
                const wcOutputAsArray = wcOutput.split(/\s+/);
                console.log(`File ${file} has ${wcOutputAsArray[1]} lines`);
                console.log(`File ${file} has ${wcOutputAsArray[2]} words`);
                console.log(`File ${file} has ${wcOutputAsArray[3]} characters`);
                console.log('');
              });
              console.log('');
            });
          });
        }
      });
    }
  }
});


yargs.command({
  command: 'get',
  describe: 'get file with higher number of characters',
  builder: {
    directory: {
      describe: 'Directory',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.directory === 'string') {
      fs.readdir(argv.directory, (err, files) => {
        if(err) {
          console.log(`Error, directory ${argv.directory} not found`)
        } else {
          let arrayMin = ['', -1];
          files.forEach(file => {
            let wcOutput = '';
            const wc = spawn('wc', ['-c', `./${argv.directory}/${file}`]);
            wc.stdout.on('data', (piece) => wcOutput += piece);
            wc.on('close', () => {
              const wcArray = wcOutput.split(/\s+/)
              if(arrayMin[1] < wcArray[0]){
                arrayMin[0] = file;
                arrayMin[1] = wcArray[0];
              }
            });
          });
          
          setTimeout(() => {
            console.log(`File with higher characters from ${argv.directory} is ${arrayMin[0]} with ${arrayMin[1]} characters`);
          }, 500);
        }
      });

    }
  }
});

yargs.parse();
