import { Board } from '../components/board';

export const Sample = () => {
    return <>邪魔になる可能性があるので止める</>
    // const ownPai = {
    //     base : [
    //         {
    //             hai: 'hai_2_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //     ],
    //     naki: [
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'left', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'right', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'center', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'ti',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'left', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'left', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_2',
    //                 },
    //                 {
    //                     hai: 'hai_1_3',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'center', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'right', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'ankan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'ankan', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //     ],
    //     sutehai: [
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_2',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_3_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'reach',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },

    //     ]
    // };

    // const player1Pai = {
    //     base : [
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //     ],
    //     naki: [
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'left', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'right', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'center', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'ti',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'left', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'left', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'center', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'right', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'ankan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'ankan', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //     ],
    //     sutehai: [
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'reach',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },

    //     ]
    // };

    
    // const player2Pai = {
    //     base : [
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //     ],
    //     naki: [
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'left', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'right', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'center', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'ti',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'left', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'left', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'center', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'right', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'ankan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'ankan', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //     ],
    //     sutehai: [
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'reach',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },

    //     ]
    // };


    // const player3Pai = {
    //     base : [
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //         {
    //             hai: 'hai_1_1', // この辺は後で対応を検討する
    //         },
    //     ],
    //     naki: [
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'left', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'right', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'pon',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'center', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         // {
    //         //     type: 'ti',
    //         //     key: {
    //         //         hai: 'hai_1_1', // 後調整
    //         //         type: 'left', 
    //         //     },
    //         //     hai: [
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         },
    //         //         {
    //         //             hai: 'hai_1_1',
    //         //         }
    //         //     ]
    //         // },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'left', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'center', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'minkan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'right', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //         {
    //             type: 'ankan',
    //             key: {
    //                 hai: 'hai_1_1', // 後調整
    //                 type: 'ankan', 
    //             },
    //             hai: [
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 },
    //                 {
    //                     hai: 'hai_1_1',
    //                 }
    //             ]
    //         },
    //     ],
    //     sutehai: [
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'reach',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },
    //         {
    //             hai: 'hai_1_1',
    //             type: 'normal',
    //         },

    //     ]
    // };

    // return <Board ownPai={ownPai} player1Pai={player1Pai} player2Pai={player2Pai} player3Pai={player3Pai} boardStatus='finish' />;
}

