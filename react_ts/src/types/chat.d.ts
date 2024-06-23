export interface Message {
    sender_id: string|null;
    role: string;
    content: string;
}

export interface Item {
    id: string;
    name: string;
}

export interface Bot extends Item {
    model?:string;
    description?: string;
    instructions?: string;
    temperature?: number;
}

export interface Room extends Item {}

