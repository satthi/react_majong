import { useState } from "react";
import { Board } from "../board"
import { getInitialYama } from "../board/hai/hai_info";
import { AllPaiProp, PaiProp } from "../board/type";

export const initialSet = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, setBoardStatus: React.Dispatch<React.SetStateAction<string>>) => {
    // とりあえず4枚ずつ配布

    for (let i = 1;i <= 3; i += 1) {

        Object.keys(allPai).forEach((user: string) => {
            // 4マイずつ配布
            const catYama = yama.splice(0, 4);
            setYama(yama);

            allPai[user].base = allPai[user].base.concat(catYama);
            setAllPai(allPai);
        })
    }

    // 1枚ずつ配布
    Object.keys(allPai).forEach((user: string) => {
        const catYama = yama.splice(0, 1);
        setYama(yama);

        // 1枚もらってから配列をソート
        allPai[user].base = allPai[user].base.concat(catYama).sort();
        setAllPai(allPai);
    })

    setBoardStatus('turn_' + Object.keys(allPai)[0])
}

export const turn = (allPai: any, setAllPai: React.Dispatch<React.SetStateAction<AllPaiProp>>, yama: string[], setYama: React.Dispatch<React.SetStateAction<string[]>>, boardStatus: string,  setBoardStatus: React.Dispatch<React.SetStateAction<string>>) => {
    const turn_user = boardStatus.replace('turn_', '');

    // 牌をツモる
    const catYama = yama.splice(0, 1);
    setYama(yama);

    // 1枚もらう
    allPai[turn_user].base = allPai[turn_user].base.concat(catYama);

    setBoardStatus('think_' + turn_user);
}

export const Game = ({oya}: {oya: string}) => {
    const userList = ['own', 'player1', 'player2', 'player3'];

    const initialSortPai = {} as any;

    let setSortPaiFlag = false;
    userList.forEach((user) => {
        if (user === oya) {
            setSortPaiFlag = true;
        }

        if (setSortPaiFlag) {
            initialSortPai[user] = {
                base: [],
                naki: [],
                sutehai: []
            };
        }
    });
    userList.forEach((user) => {
        if (user === oya) {
            setSortPaiFlag = false;
        }

        if (setSortPaiFlag) {
            initialSortPai[user] = {
                base: [],
                naki: [],
                sutehai: []
            };
        }
    });

    const [allPai, setAllPai] = useState(initialSortPai as AllPaiProp);

    // 山の設置
    const [yama, setYama] = useState(getInitialYama() as string[]);

    const [boardStatus, setBoardStatus] = useState('initial');

    // initial時の処理
    if (boardStatus === 'initial') {
        initialSet(allPai, setAllPai, yama, setYama, setBoardStatus);
    }

    // ターン
    if (boardStatus.match(/^turn_/)) {
        turn(allPai, setAllPai, yama, setYama, boardStatus, setBoardStatus);
    }
    console.log(boardStatus)
 
    return <Board allPai={allPai} boardStatus={boardStatus} />
}