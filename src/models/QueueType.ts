enum QueueType {
    RankedSolo,
    RankedFlex,
}

export function fromUggQueueType(uggString: string) {
    const result = {
        ranked_flex_sr: QueueType.RankedFlex,
        ranked_solo_5x5: QueueType.RankedSolo,
    }[uggString];

    if (result === undefined) {
        throw new Error(`QueueType "${uggString}" not known`);
    }

    return result;
}

export default QueueType;
