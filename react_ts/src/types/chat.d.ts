export interface Message {
    id:string;
    thread_id:string;
    created_at:string;

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
}

export interface Room extends Item {}

