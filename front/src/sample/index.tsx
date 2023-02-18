import { Board } from '../components/board';

export const Sample = () => {
    const ownPai = {
        base : [
            {
                position: 1,
                hai: 'hai_2_1', // この辺は後で対応を検討する
            },
            {
                position: 2,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 3,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 4,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 5,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 6,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 7,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 8,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 9,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 10,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 11,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 12,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 13,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 14,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
        ],
        naki: [
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'right', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'center', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'ti',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'left', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_2',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_3',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'center', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'right', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'ankan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'ankan', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
        ],
        sutehai: [
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_2',
                type: 'normal',
            },
            {
                hai: 'hai_3_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'reach',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },

        ]
    };

    const player1Pai = {
        base : [
            {
                position: 1,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 2,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 3,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 4,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 5,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 6,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 7,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 8,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 9,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 10,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 11,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 12,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 13,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 14,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
        ],
        naki: [
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'right', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'center', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'ti',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'left', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'center', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'right', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'ankan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'ankan', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
        ],
        sutehai: [
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'reach',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },

        ]
    };

    
    const player2Pai = {
        base : [
            {
                position: 1,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 2,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 3,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 4,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 5,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 6,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 7,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 8,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 9,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 10,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 11,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 12,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 13,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 14,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
        ],
        naki: [
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'right', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'center', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'ti',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'left', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'center', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'right', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'ankan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'ankan', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
        ],
        sutehai: [
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'reach',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },

        ]
    };


    const player3Pai = {
        base : [
            {
                position: 1,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 2,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 3,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 4,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 5,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 6,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 7,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 8,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 9,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 10,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 11,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 12,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 13,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
            {
                position: 14,
                hai: 'hai_1_1', // この辺は後で対応を検討する
            },
        ],
        naki: [
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'right', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'pon',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'center', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            // {
            //     type: 'ti',
            //     key: {
            //         hai: 'hai_1_1', // 後調整
            //         type: 'left', 
            //     },
            //     hai: [
            //         {
            //             position: 1,
            //             hai: 'hai_1_1',
            //         },
            //         {
            //             position: 2,
            //             hai: 'hai_1_1',
            //         }
            //     ]
            // },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'left', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'center', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'minkan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'right', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
            {
                type: 'ankan',
                key: {
                    hai: 'hai_1_1', // 後調整
                    type: 'ankan', 
                },
                hai: [
                    {
                        position: 1,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 2,
                        hai: 'hai_1_1',
                    },
                    {
                        position: 3,
                        hai: 'hai_1_1',
                    }
                ]
            },
        ],
        sutehai: [
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'reach',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },
            {
                hai: 'hai_1_1',
                type: 'normal',
            },

        ]
    };
    return <Board ownPai={ownPai} player1Pai={player1Pai} player2Pai={player2Pai} player3Pai={player3Pai} />;
}

