export type AllPaiProp = {
    own: PaiProp;
    player1: PaiProp;
    player2: PaiProp;
    player3: PaiProp;
};

export type PaiProp = {
    base: string[];
    naki: nakiPositionProp[];
    sutehai: SutehaiProp[];
};

type nakiPositionProp = {
    type: string;
    key: {
        hai: string;
        type: string;
    };
    hai: string[];
};

export type SutehaiProp = {
    hai: string;
    type: string;
};