import React from 'react';
import ReactDOM from 'react-dom/client';
import { Board } from '../components/board';

export const Sample = () => {
    const ownPai = {
        base : [
            {
                position: 1,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 2,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 3,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 4,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 5,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 6,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 7,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 8,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 9,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 10,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 11,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 12,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 13,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 14,
                hai: 'ms1', // この辺は後で対応を検討する
            },
        ],
        naki: [
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'right', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'center', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'ti',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'left', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'center', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'right', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'ankan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'ankan', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
        ],
        sutehai: [
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'reach',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },

        ]
    };

    const player1Pai = {
        base : [
            {
                position: 1,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 2,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 3,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 4,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 5,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 6,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 7,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 8,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 9,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 10,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 11,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 12,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 13,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 14,
                hai: 'ms1', // この辺は後で対応を検討する
            },
        ],
        naki: [
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'right', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'center', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'ti',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'left', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'center', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'right', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'ankan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'ankan', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
        ],
        sutehai: [
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'reach',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },

        ]
    };

    
    const player2Pai = {
        base : [
            {
                position: 1,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 2,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 3,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 4,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 5,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 6,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 7,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 8,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 9,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 10,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 11,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 12,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 13,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 14,
                hai: 'ms1', // この辺は後で対応を検討する
            },
        ],
        naki: [
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'right', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'center', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'ti',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'left', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'center', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'right', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'ankan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'ankan', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
        ],
        sutehai: [
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'reach',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },

        ]
    };


    const player3Pai = {
        base : [
            {
                position: 1,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 2,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 3,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 4,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 5,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 6,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 7,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 8,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 9,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 10,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 11,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 12,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 13,
                hai: 'ms1', // この辺は後で対応を検討する
            },
            {
                position: 14,
                hai: 'ms1', // この辺は後で対応を検討する
            },
        ],
        naki: [
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'right', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'center', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            // {
            //     type: 'ti',
            //     key: {
            //         hai: 'ms1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'ms1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'ms1',
            //         }
            //     ]
            // },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'left', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'center', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'right', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
            {
                type: 'ankan',
                key: {
                    hai: 'ms1', // 後調整
                    type: 'ankan', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'ms1',
                    },
                    {
                        position: 2,
                        hai: 'ms1',
                    },
                    {
                        position: 3,
                        hai: 'ms1',
                    }
                ]
            },
        ],
        sutehai: [
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'reach',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },
            {
                hai: 'ms1',
                type: 'normal',
            },

        ]
    };
    return <Board ownPai={ownPai} player1Pai={player1Pai} player2Pai={player2Pai} player3Pai={player3Pai} />;
}

