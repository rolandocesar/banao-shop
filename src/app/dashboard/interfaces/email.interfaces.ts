
export interface Email {
    ok:   boolean;
    info: Info;
}

export interface Info {
    accepted:     string[];
    rejected:     any[];
    envelopeTime: number;
    messageTime:  number;
    messageSize:  number;
    response:     string;
    envelope:     Envelope;
    messageId:    string;
}

export interface Envelope {
    from: string;
    to:   string[];
}
