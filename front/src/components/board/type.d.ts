export type PaiProp = {
    base: HaiPositionProp[];
    naki: nakiPositionProp[];
    sutehai: SutehaiProp[];
};

type HaiPositionProp = {
    position: number;
    hai: string;
};

type nakiPositionProp = {
    type: string;
    key: {
        hai: string;
        type: string;
    };
    hai: HaiPositionProp[];
};

export type SutehaiProp = {
    hai: string;
    type: string;
};