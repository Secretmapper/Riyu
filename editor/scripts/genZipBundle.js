var archiver = require('archiver');
var fs = require('fs-extra');
var path = require('path');

var paths = {
  // TODO: This should really not be hardcoded
  build: path.join(__dirname, '..', '/build'),
  bundle: path.join(__dirname, '..', '/public/riyu.zip'),
  riyu: path.join(__dirname, '..', '..'),
}

function prepareBundleStream () {
  if (fs.existsSync(paths.bundle)) {
    fs.unlink(paths.bundle);
  }

  return fs.createWriteStream(paths.bundle);
}

function onArchiverErr (err) {
  throw err;
}

function onArchiverFinish (archive) {
  console.log('riyu bundle finished: ' + archive.pointer() + ' total bytes');
}

function genZipBundle () {
  var output = prepareBundleStream();
  var archive = archiver('zip', { store: true });

  output.on('close', function () { onArchiverFinish(archive) });
  archive.on('error', onArchiverErr);
  archive.pipe(output);

  addFilesToArchiver(archive);
  archive.finalize();
}

function addFilesToArchiver(archive) {
  var directories = ['css', 'img', 'js', 'lib'];
  var files = ['index.html', 'README.md', 'package.json'];

  for (var i = 0; i < directories.length; i++) {
    var dir = directories[i];
    archive.directory(path.join(paths.riyu, dir), dir);
  }

  // TODO: there's gotta be a better way to do this
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    archive.glob(file, { cwd: paths.riyu });
  }
}

genZipBundle();
