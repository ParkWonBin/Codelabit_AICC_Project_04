export interface Message {
    sender_id: string;
    role: string;
    content: string;
}

export interface Item {
    id: number;
    name: string;
}

export interface Bot extends Item {
    description:string;
    instructions:string;
    temperature:number;
}

export interface Room extends Item {}

