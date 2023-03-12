import { Cell, Slice, Address, Builder, beginCell, ComputeError, TupleItem, TupleReader, Dictionary, contractAddress, ContractProvider, Sender, Contract, ContractABI, TupleBuilder, DictionaryValue } from 'ton-core';
import { ContractSystem, ContractExecutor } from 'ton-emulator';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}
export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}
export type Loan = {
    $$type: 'Loan';
    principal: bigint;
    repayment: bigint;
    start_time: bigint;
    duration: bigint;
    borrower: Address;
    lender: Address;
}

export function storeLoan(src: Loan) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.principal, 257);
        b_0.storeInt(src.repayment, 257);
        b_0.storeInt(src.start_time, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.duration, 257);
        b_1.storeAddress(src.borrower);
        b_1.storeAddress(src.lender);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadLoan(slice: Slice) {
    let sc_0 = slice;
    let _principal = sc_0.loadIntBig(257);
    let _repayment = sc_0.loadIntBig(257);
    let _start_time = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _duration = sc_1.loadIntBig(257);
    let _borrower = sc_1.loadAddress();
    let _lender = sc_1.loadAddress();
    return { $$type: 'Loan' as const, principal: _principal, repayment: _repayment, start_time: _start_time, duration: _duration, borrower: _borrower, lender: _lender };
}

function loadTupleLoan(source: TupleReader) {
    let _principal = source.readBigNumber();
    let _repayment = source.readBigNumber();
    let _start_time = source.readBigNumber();
    let _duration = source.readBigNumber();
    let _borrower = source.readAddress();
    let _lender = source.readAddress();
    return { $$type: 'Loan' as const, principal: _principal, repayment: _repayment, start_time: _start_time, duration: _duration, borrower: _borrower, lender: _lender };
}

function storeTupleLoan(source: Loan) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.principal);
    builder.writeNumber(source.repayment);
    builder.writeNumber(source.start_time);
    builder.writeNumber(source.duration);
    builder.writeAddress(source.borrower);
    builder.writeAddress(source.lender);
    return builder.build();
}

function dictValueParserLoan(): DictionaryValue<Loan> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeLoan(src)).endCell());
        },
        parse: (src) => {
            return loadLoan(src.loadRef().beginParse());
        }
    }
}
export type StartLoan = {
    $$type: 'StartLoan';
    investor: Address;
    item: Address;
    amount: bigint;
    repay_amount: bigint;
    duration: bigint;
}

export function storeStartLoan(src: StartLoan) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3999780085, 32);
        b_0.storeAddress(src.investor);
        b_0.storeAddress(src.item);
        b_0.storeInt(src.amount, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.repay_amount, 257);
        b_1.storeInt(src.duration, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadStartLoan(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3999780085) { throw Error('Invalid prefix'); }
    let _investor = sc_0.loadAddress();
    let _item = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _repay_amount = sc_1.loadIntBig(257);
    let _duration = sc_1.loadIntBig(257);
    return { $$type: 'StartLoan' as const, investor: _investor, item: _item, amount: _amount, repay_amount: _repay_amount, duration: _duration };
}

function loadTupleStartLoan(source: TupleReader) {
    let _investor = source.readAddress();
    let _item = source.readAddress();
    let _amount = source.readBigNumber();
    let _repay_amount = source.readBigNumber();
    let _duration = source.readBigNumber();
    return { $$type: 'StartLoan' as const, investor: _investor, item: _item, amount: _amount, repay_amount: _repay_amount, duration: _duration };
}

function storeTupleStartLoan(source: StartLoan) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.investor);
    builder.writeAddress(source.item);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.repay_amount);
    builder.writeNumber(source.duration);
    return builder.build();
}

function dictValueParserStartLoan(): DictionaryValue<StartLoan> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStartLoan(src)).endCell());
        },
        parse: (src) => {
            return loadStartLoan(src.loadRef().beginParse());
        }
    }
}
export type Repay = {
    $$type: 'Repay';
    item: Address;
}

export function storeRepay(src: Repay) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1648644084, 32);
        b_0.storeAddress(src.item);
    };
}

export function loadRepay(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1648644084) { throw Error('Invalid prefix'); }
    let _item = sc_0.loadAddress();
    return { $$type: 'Repay' as const, item: _item };
}

function loadTupleRepay(source: TupleReader) {
    let _item = source.readAddress();
    return { $$type: 'Repay' as const, item: _item };
}

function storeTupleRepay(source: Repay) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.item);
    return builder.build();
}

function dictValueParserRepay(): DictionaryValue<Repay> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRepay(src)).endCell());
        },
        parse: (src) => {
            return loadRepay(src.loadRef().beginParse());
        }
    }
}
export type Claim = {
    $$type: 'Claim';
    item: Address;
}

export function storeClaim(src: Claim) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3854367219, 32);
        b_0.storeAddress(src.item);
    };
}

export function loadClaim(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3854367219) { throw Error('Invalid prefix'); }
    let _item = sc_0.loadAddress();
    return { $$type: 'Claim' as const, item: _item };
}

function loadTupleClaim(source: TupleReader) {
    let _item = source.readAddress();
    return { $$type: 'Claim' as const, item: _item };
}

function storeTupleClaim(source: Claim) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.item);
    return builder.build();
}

function dictValueParserClaim(): DictionaryValue<Claim> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaim(src)).endCell());
        },
        parse: (src) => {
            return loadClaim(src.loadRef().beginParse());
        }
    }
}
export type Withdraw = {
    $$type: 'Withdraw';
    receiver: Address;
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3300294648, 32);
        b_0.storeAddress(src.receiver);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3300294648) { throw Error('Invalid prefix'); }
    let _receiver = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'Withdraw' as const, receiver: _receiver, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    let _receiver = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, receiver: _receiver, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.receiver);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}
export type Deposit = {
    $$type: 'Deposit';
    amount: bigint;
}

export function storeDeposit(src: Deposit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2308551012, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadDeposit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2308551012) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'Deposit' as const, amount: _amount };
}

function loadTupleDeposit(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Deposit' as const, amount: _amount };
}

function storeTupleDeposit(source: Deposit) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserDeposit(): DictionaryValue<Deposit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeposit(src)).endCell());
        },
        parse: (src) => {
            return loadDeposit(src.loadRef().beginParse());
        }
    }
}
export type Transfer = {
    $$type: 'Transfer';
    queryId: bigint;
    newOwner: Address;
    responseDestination: Address;
    customPayload: Cell | null;
    forwardAmount: bigint;
    forwardPayload: Cell;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    let _responseDestination = sc_0.loadAddress();
    let _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forwardAmount = sc_0.loadCoins();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'Transfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleTransfer(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    let _responseDestination = source.readAddress();
    let _customPayload = source.readCellOpt();
    let _forwardAmount = source.readBigNumber();
    let _forwardPayload = source.readCell();
    return { $$type: 'Transfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardAmount);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}
export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    queryId: bigint;
    prevOwner: Address;
    forwardPayload: Cell;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.prevOwner);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _prevOwner = sc_0.loadAddress();
    let _forwardPayload = sc_0.asCell();
    return { $$type: 'OwnershipAssigned' as const, queryId: _queryId, prevOwner: _prevOwner, forwardPayload: _forwardPayload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _prevOwner = source.readAddress();
    let _forwardPayload = source.readCell();
    return { $$type: 'OwnershipAssigned' as const, queryId: _queryId, prevOwner: _prevOwner, forwardPayload: _forwardPayload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.prevOwner);
    builder.writeSlice(source.forwardPayload);
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}
export type Excesses = {
    $$type: 'Excesses';
    queryId: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

function loadTupleExcesses(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}
export type GetStaticData = {
    $$type: 'GetStaticData';
    queryId: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

function loadTupleGetStaticData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

function storeTupleGetStaticData(source: GetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}
export type ReportStaticData = {
    $$type: 'ReportStaticData';
    queryId: bigint;
    indexId: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeInt(src.indexId, 257);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _indexId = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, queryId: _queryId, indexId: _indexId, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _indexId = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, queryId: _queryId, indexId: _indexId, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.indexId);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}
export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    query_id: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}
export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}
export type CollectionData = {
    $$type: 'CollectionData';
    next_item_index: bigint;
    collection_content: Cell;
    owner_address: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.next_item_index, 257);
        b_0.storeRef(src.collection_content);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadCollectionData(slice: Slice) {
    let sc_0 = slice;
    let _next_item_index = sc_0.loadIntBig(257);
    let _collection_content = sc_0.loadRef();
    let _owner_address = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function loadTupleCollectionData(source: TupleReader) {
    let _next_item_index = source.readBigNumber();
    let _collection_content = source.readCell();
    let _owner_address = source.readAddress();
    return { $$type: 'CollectionData' as const, next_item_index: _next_item_index, collection_content: _collection_content, owner_address: _owner_address };
}

function storeTupleCollectionData(source: CollectionData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.next_item_index);
    builder.writeCell(source.collection_content);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}
export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    let _numerator = sc_0.loadIntBig(257);
    let _denominator = sc_0.loadIntBig(257);
    let _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}
export type GetNftData = {
    $$type: 'GetNftData';
    is_initialized: boolean;
    index: bigint;
    collection_address: Address;
    owner_address: Address | null;
    individual_content: Cell;
}

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.is_initialized);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection_address);
        b_0.storeAddress(src.owner_address);
        b_0.storeRef(src.individual_content);
    };
}

export function loadGetNftData(slice: Slice) {
    let sc_0 = slice;
    let _is_initialized = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadMaybeAddress();
    let _individual_content = sc_0.loadRef();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function loadTupleGetNftData(source: TupleReader) {
    let _is_initialized = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection_address = source.readAddress();
    let _owner_address = source.readAddressOpt();
    let _individual_content = source.readCell();
    return { $$type: 'GetNftData' as const, is_initialized: _is_initialized, index: _index, collection_address: _collection_address, owner_address: _owner_address, individual_content: _individual_content };
}

function storeTupleGetNftData(source: GetNftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.is_initialized);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection_address);
    builder.writeAddress(source.owner_address);
    builder.writeCell(source.individual_content);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        }
    }
}
export type UpdateAccess = {
    $$type: 'UpdateAccess';
    user: Address;
    access: boolean | null;
}

export function storeUpdateAccess(src: UpdateAccess) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(476591635, 32);
        b_0.storeAddress(src.user);
        if (src.access !== null && src.access !== undefined) { b_0.storeBit(true).storeBit(src.access); } else { b_0.storeBit(false); }
    };
}

export function loadUpdateAccess(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 476591635) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _access = sc_0.loadBit() ? sc_0.loadBit() : null;
    return { $$type: 'UpdateAccess' as const, user: _user, access: _access };
}

function loadTupleUpdateAccess(source: TupleReader) {
    let _user = source.readAddress();
    let _access = source.readBooleanOpt();
    return { $$type: 'UpdateAccess' as const, user: _user, access: _access };
}

function storeTupleUpdateAccess(source: UpdateAccess) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeBoolean(source.access);
    return builder.build();
}

function dictValueParserUpdateAccess(): DictionaryValue<UpdateAccess> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeUpdateAccess(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateAccess(src.loadRef().beginParse());
        }
    }
}
export type BurnItem = {
    $$type: 'BurnItem';
    queryId: bigint;
}

export function storeBurnItem(src: BurnItem) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1494247697, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadBurnItem(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1494247697) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'BurnItem' as const, queryId: _queryId };
}

function loadTupleBurnItem(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'BurnItem' as const, queryId: _queryId };
}

function storeTupleBurnItem(source: BurnItem) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserBurnItem(): DictionaryValue<BurnItem> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBurnItem(src)).endCell());
        },
        parse: (src) => {
            return loadBurnItem(src.loadRef().beginParse());
        }
    }
}
export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}
export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}
async function Collection_init(ownerAddress: Address, collectionContent: Cell, royaltyParams: RoyaltyParams) {
    const __init = 'te6ccgEBCgEAYgABFP8A9KQT9LzyyAsBAgFiAgMCAs0EBQANoUrd4AvgDQAB1AIBIAYHAAVW8jgBFUcAbIzAYFBNs8yYCAEmUFbLH1ADzxbIUDME2zwSzMkBzAkAHlAjgQEBzwCBAQHPAAHPFg==';
    const __code = 'te6ccgECSgEABUAAART/APSkE/S88sgLAQIBYgIDAgLKBAUCASASEwIBIAYHAgEgHR4CAWIICQIB7hERBKdO2i7ftwIddJwh+VMCDXCx/eAtDTAwFxsMABkX+RcOIB+kAiUGZvBPhhApFb4CCCEGk9OVC6j5Mw2zwG2zwxEFYQRRA0QTDwM9s84CCCEJRqmLa6gaCg4LAAtCBu8tCAgAINMfAYIQaT05ULry4IHTPwEEMI+TMNs8Bts8MRBWEEUQNEEw8DTbPODAABoMDg0AINMfAYIQlGqYtrry4IHTPwECcI8w+QGC8CR8e9XzniJY2ArDagQZoatXeXV4JabMDpFTaPAGEKGKuo8I2zzwMts82zHgkTDi8sCCGg4BGMj4QgHMVVDbPMntVA8BJlBWyx9QA88WyFAzBNs8EszJAcwQAB5QI4EBAc8AgQEBzwABzxYAASACASAUFQIBIBYXARG4td2zxVFfAwgaARG6ej2zxVBfAvgaAgEgGBkBEbtZvbPPAx8B+BoBEbYLe2eeBd4D0BoATbd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHMAEW7UTQ1AH4Yts8bBYbASjTH/pAAQHUAdDbPAPUMBBGEEVBMBwAHoEBAdcAgQEB1wD6QAFDMAIBIB8gAgFIPT4CASAhIgIBIC0uAgFYIyQCASAlJgAFMjJgAAM0IAIBICcoAgEgKSoACTwIvAjgAEscFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0IAL3MhxAcoBUAcBygBwAcoCUAXPFlAD+gJwAcpoI26zJW6zsY5GfwHKAMhwAcoAcAHKACRus5p/AcoABPACUATMljQDcAHKAOIkbrOafwHKAATwAlAEzJY0A3ABygDicAHKAAJ/AcoAAslYzJczMwFwAcoA4iFus+MPyQH7AICssACU+EFvJBAjXwN/AnCAQlhtbfAmgABJ/AcoAAfACAcwACjFwAcoAAgEgLzACASA4OQIBIDEyAgEgNDUBFRtcAbIzFBm2zzJgMwBTATQ9AQwbQGCAND3AYAQ9A9vofLghwGCAND3IgKAEPQXyPQAyVUwBfAogADpQZc8WE4EBAc8AASBulTBwAcsBks8W4swSygD0AAAVPhC+ChUECck8CmABdyCAPUWKML/8vQnBhBXBBA3QHjwKnBTIfAlcnDwIiHwJBA0AxEQAy1VINs8RlAQSxA8QLzwJgOkRFVDE4DYBDMhVUNs8yTcAUoIQX8w9FFAHyx8Vyz9QA88WAc8WIW6zlX8BygDMlHAyygDiAfoCAc8WAgEgOjoCASA7PAALIIJycOAgAl8bDHIbwABb4xtb4wB8CPbPIuW1ldGEuanNvbo2zxvIgHJkyFus5YBbyJZzMnoMQGBDQwANPAqbGLwJYAIBID9AAQnW2eeBPEgCASBBQgIBIERFAUMbHHIbwABb4xtb4wB8CPbPG8iAcmTIW6zlgFvIlnMyegxgQwAHDBsI4AC6INdKIddJlyDCACLCALGOSgNvIoB/Is8xqwKhBasCUVW2CCDCAJwgqgIV1xhQM88WQBTeWW8CU0GhwgCZyAFvAlBEoaoCjhIxM8IAmdQw0CDXSiHXSZJwIOLi6F8DAE0+EFvJDAy+CdvECKhVVLwLFF3tggXoQbwLRegGKEQRxA2RUAT8CuABKRw+ChwgEBUNIcr2zwQNEEwbW3wJoEYBDMhVMNs8yUcAKIIQqMsArVAFyx8Tyz/LD8sPAc8WAQrIAds8yUkAFoIQr/kPV1jLH8s/';
    const __system = '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';
    let systemCell = Cell.fromBase64(__system);
    let builder = new TupleBuilder();
    builder.writeCell(systemCell);
    builder.writeAddress(ownerAddress);
    builder.writeCell(collectionContent);
    builder.writeTuple(storeTupleRoyaltyParams(royaltyParams));
    let __stack = builder.build();
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let initCell = Cell.fromBoc(Buffer.from(__init, 'base64'))[0];
    let system = await ContractSystem.create();
    let executor = await ContractExecutor.create({ code: initCell, data: new Cell() }, system);
    let res = await executor.get('init', __stack);
    if (!res.success) { throw Error(res.error); }
    if (res.exitCode !== 0 && res.exitCode !== 1) {
        if (Collection_errors[res.exitCode]) {
            throw new ComputeError(Collection_errors[res.exitCode].message, res.exitCode, { logs: res.logs });
        } else {
            throw new ComputeError('Exit code: ' + res.exitCode, res.exitCode, { logs: res.logs });
        }
    }
    
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

const Collection_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    2412: { message: `investor is invalid` },
    8811: { message: `insufficient repay amount` },
    37050: { message: `borrower is invalid` },
    45872: { message: `insuffient liquidity` },
    58406: { message: `collateral has been used ` },
    62392: { message: `collateral not found ` },
    62742: { message: `non-sequential NFTs` },
}

export class Collection implements Contract {
    
    static async init(ownerAddress: Address, collectionContent: Cell, royaltyParams: RoyaltyParams) {
        return await Collection_init(ownerAddress,collectionContent,royaltyParams);
    }
    
    static async fromInit(ownerAddress: Address, collectionContent: Cell, royaltyParams: RoyaltyParams) {
        const init = await Collection_init(ownerAddress,collectionContent,royaltyParams);
        const address = contractAddress(0, init);
        return new Collection(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Collection(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: Collection_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'Mint' | GetRoyaltyParams | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'Mint') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetRoyaltyParams') {
            body = beginCell().store(storeGetRoyaltyParams(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetCollectionData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_collection_data', builder.build())).stack;
        const result = loadTupleCollectionData(source);
        return result;
    }
    
    async getGetNftAddressByIndex(provider: ContractProvider, itemIndex: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(itemIndex);
        let source = (await provider.get('get_nft_address_by_index', builder.build())).stack;
        let result = source.readAddressOpt();
        return result;
    }
    
    async getGetNftContent(provider: ContractProvider, index: bigint, individualContent: Cell) {
        let builder = new TupleBuilder();
        builder.writeNumber(index);
        builder.writeCell(individualContent);
        let source = (await provider.get('get_nft_content', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getGetRoyaltyParams(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_royalty_params', builder.build())).stack;
        const result = loadTupleRoyaltyParams(source);
        return result;
    }
    
}