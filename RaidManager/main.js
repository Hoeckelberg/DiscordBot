const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();
const fs = require('fs');


client.once('ready', () => {
    console.log('Bot is online!\n');
})

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

    if (command === 'help') {
        message.channel.send('wäre nice wa');
    } else if(command === 'raidlist'){
        if(!message.mentions.users.size) {
            return message.reply('Welchen Raid?\nKarazhan=1\nGruul=2\nMagtheridon=3');
        }
    } else if (command === 'raidlist_1_setup') {
        const list = JSON.parse(fs.readFileSync('karazhan.json'));
        const json = JSON.stringify(list, null, 4);
        //console.log(json);
        message.channel.send(json);
        
    } else if(command === 'raidlist_1_count'){
        message.channel.send(`Karazhan Count: Tanks:${TankCount}/2, Heals:${HealCount}/3, DDs:${DDcount}/5`);
        console.log(DDcount, '/5 DDs');
        console.log(TankCount, '/2 Tanks')
        console.log(HealCount, '/3 Healer')
    } else if (command === 'kara'){
        if(!args.length){
            return message.channel.send(`Keine Parameter!\nParams: Name, Klasse, Rolle, ${message.author}`);
        }
        var raid = {
            name: args[0],
            klasse: args[1],
            rolle: args[2]
        };
        if (!fs.existsSync('karazhan.json')) {
            fs.writeFileSync('karazhan.json', "[]");
        }
        var json = JSON.parse(fs.readFileSync('karazhan.json'));
        json.push(raid);
        fs.writeFileSync('karazhan.json', JSON.stringify(json, null, 4));
        if (args[2] == 'DD' || 'dd' || 'Dd') {
           IncreaseCount();
        }
        if(args[2] == 'Heal' || 'heal'){
            IncreaseCountHeal();
        }
        if(args[2] =='Tank' || 'tank'){
            IncreaseCountTank();
        }
    }
    //message.channel.send(`Command name: ${command}\nArguments: ${args}`);
})

var DDcount = 0;
function IncreaseCount(){
    if(DDcount < 6){
        DDcount++;
    }
    
}
var TankCount=0;
function IncreaseCountTank(){
    if(TankCount < 3){
        TankCount++;
    }
    
}
var HealCount=0;
function IncreaseCountHeal(){
    if(HealCount < 3){
        HealCount++;
    }
    
}
client.login(token);


