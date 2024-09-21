const player1 ={
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 ={
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

const player3 ={
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
};

const player4 ={
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};

const player5 ={
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
};

const player6 ={
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random();
    let result

    switch (true){
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute} `);
}

async function playRaceEngine(character1, character2){
    for (let round = 1; round <= 5; round++){
        console.log(`🏁 Round ${round} 🏁`);
        // Sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // Rolar dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let TotalSkillTest1 = 0;
    let TotalSkillTest2 = 0;
    
    if(block == "RETA"){
        TotalSkillTest1 = character1.VELOCIDADE + diceResult1;
        TotalSkillTest2 = character2.VELOCIDADE + diceResult2;
        
        await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
        await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);

    }
    if(block == "CURVA"){
        TotalSkillTest1 = character1.MANOBRABILIDADE + diceResult1;
        TotalSkillTest2 = character2.MANOBRABILIDADE + diceResult2;

        await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
        await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
    }
    if(block == "CONFRONTO"){    
        let powerResult1 = character1.PODER + diceResult1;
        let powerResult2 = character2.PODER + diceResult2;
        
        console.log(`🥊 ${character1.NOME} confrontou ${character2.NOME}🥊`);

        await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
        await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

        //Para que fique registrado, abaixo temos 'if ternário' que verifica se o poder do personagem é maior que o do outro, se sim, ele ganha um ponto. 
        //character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;
        //character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;
        

        if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
            console.log(
              `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
            );
            character2.PONTOS--;
          }
          if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
            console.log(
                `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
            );
            character1.PONTOS--;    
            }  
            console.log(powerResult1 == powerResult2 ? "Empate! Nenhum ponto perdido." : ""
          );
    }

//Verificando o vencedor
if(TotalSkillTest1 > TotalSkillTest2){
    console.log(`${character1.NOME} Marcou um ponto!`);
    character1.PONTOS++;
    } else if (TotalSkillTest2 > TotalSkillTest1){
    console.log(`${character2.NOME} Marcou um ponto!`);
    character2.PONTOS++;
    }


    console.log("------------------------------");
    }
    
}

async function declareWinner(character1, character2){
    console.log("🥁 Resultado Final 🥁");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if(character1.PONTOS > character2.PONTOS)
        console.log(`🏆 ${character1.NOME} venceu a corrida! Parabéns! 🏆`);
     else if (character2.PONTOS > character1.PONTOS)
        console.log(`🏆 ${character2.NOME} venceu a corrida! Parabéns! 🏆`);
     else console.log(`🏆 A corrida terminou empatada! 🏆`);
    }
    

// A função a seguir é auto-invocável, perceba que a coloquei entre parêntesis e depois ainda adicionei outro parêntesis.
(async function main(){
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n`
    );
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();