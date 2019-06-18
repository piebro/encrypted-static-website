module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    password: undefined,

    prompt: {
      getPassword: {
        options: {
          questions: [
            {
              config: 'password1',
              type: 'password',
              message: 'Password:'
            }
          ]
        }
      },
      getPasswordVerification: {
        options: {
          questions: [
            {
              config: 'password1',
              type: 'password',
              message: 'Password:'
            },
            {
              config: 'password2',
              type: 'password',
              message: 'Verify Password:'
            }
          ]
        }
      }
    },

    exec: {
      encode: 'node symetric-gpg.js encrypt secret.html secret.html.gpg.js "<%= password1 %>" "<%= password2 %>"',
      decode: 'node symetric-gpg.js decrypt secret.html.gpg.js secret.html <%= password1 %>'
    }
  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-prompt');

  grunt.registerTask('encode', ['prompt:getPasswordVerification', 'exec:encode']);
  grunt.registerTask('decode', ['prompt:getPassword', 'exec:decode']);

};