# encrypted-static-website

A tool to host a symetric pgp encrypted static website. Go to: [encrypted-static-website](https://piebro.github.io/encrypted-static-website) to test it. The Password is 'secret'.

To make your own encrypted static website fork or download the repository. Use `npm install` to init the project. Then you can use `grunt decode` to get secret.html and `grunt encode` to get secret.html.gpg.js

The decrypted secret.html is part of the .gitignore. To make sure the secret is not on your local computer you will need to delete it manually
