require('dotenv').config()
const fetch = require("node-fetch");

module.exports = {
    get
};


async function get() {
  
  const data = await fetch(
        `https://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1/?key=${process.env.DOTA_KEY}&start_at_match_seq_num=4956422452`
    )
    let response = await data.json();

    let matches = response.result.matches
    const heroesData = await fetch(
        `https://www.dota2.com/datafeed/herolist?language=english`
    )
    let resHeroes = await heroesData.json();

    let heroes = resHeroes.result.data.heroes
    heroes.forEach(element => { 
        let cloneElement = element
        cloneElement.imgUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${ cloneElement.name.replace('npc_dota_hero_','')}.png`;
    });
   
    let players_who_win = []
    matches.forEach((match,key) => {
          if(match.radiant_win){
              match.players.slice(0,5).map(player=>{
                  players_who_win.push(player)
              })
          }
          else{
            match.players.slice(5,10).map(player=>{
                players_who_win.push(player)
            })
        }
    });
    let result = []

    players_who_win.forEach(player=>{
          const {
              hero_id,
              item_0,
              item_1,
              item_2,
              item_3,
              item_4,
              item_5,
              kills,
              deaths,
              assists,
              ability_upgrades} = player
          result.push({
            hero_id:hero_id,
            hero_details:Object.assign({}, heroes[heroes.findIndex(item=> item.id ===hero_id)]),
            item_0:item_0,
            item_1:item_1,
            item_2:item_2,
            item_3:item_3,
            item_4:item_4,
            item_5:item_5,
            kills:kills,
            deaths:deaths,
            assists:assists,
            ability_upgrades:ability_upgrades
          })
    })
    return  result
}

