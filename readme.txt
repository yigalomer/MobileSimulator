1) Download and install node.js: https://nodejs.org/download/
2) Set npm proxy http: npm config set proxy http://web-proxy.atl.hp.com:8088
OR
2.5) Set npm proxy http: npm config set proxy http://rhvwebcachevip.bastion.europe.hp.com:8080
3) Set npm proxy https: npm config set https-proxy http://web-proxy.atl.hp.com:8088
OR
3.5) Set npm proxy http: npm config set https-proxy http://rhvwebcachevip.bastion.europe.hp.com:8080
4) Open cmd.exe
5) CD to your project folder
6) Setup external modules: npm install
7) Run application: node server
	