{exec} = require 'child_process'

task 'build', 'Build project in src/', () ->
  exec 'coffee -c src/', (err,stdout,stderr) ->
    throw err if err
    console.log stdout + stderr
