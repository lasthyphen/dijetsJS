"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bintools_1 = __importDefault(require("src/utils/bintools"));
const bn_js_1 = __importDefault(require("bn.js"));
const buffer_1 = require("buffer/");
const bintools = bintools_1.default.getInstance();
describe('BinTools', () => {
    const hexstr = '00112233445566778899aabbccddeeff';
    const hexstr2 = '0001020304050607080909080706050403020100';
    const hexstr3 = '0001020304050607080909080706050403020101';
    const hexbuffstr1 = '000461736466'; // = asdf
    const hexbuffstr2 = '000761626364656667'; // = abcdefg
    const hexbuffstr3 = '00076f6b0066696e65'; // = ok<null>fineokfine
    const b58str = '1UoWww8DGaVGLtea7zU7p';
    const b58str2 = '1Bhh3pU9gLXZiJv73kmqZwHJ4F';
    const b58str3 = '1Bhh3pU9gLXZiJv73kmqZwHJ4G';
    const buff = buffer_1.Buffer.from(hexstr, 'hex');
    const buff2 = buffer_1.Buffer.from(hexstr2, 'hex');
    const buff3 = buffer_1.Buffer.from(hexstr3, 'hex');
    const checksum = '323e6811';
    const serializedChecksum = '148vjpuxYXixb8DcbaWyeDE2fEG'; // serialized hexstr + checksum
    test('copyFrom conducts a true copy', () => {
        const buff = buffer_1.Buffer.from(hexstr, 'hex');
        const newbuff = bintools.copyFrom(buff, 0, 10);
        expect(newbuff.length).toBe(10);
        expect(newbuff.readUInt8(0)).toBe(0);
        expect(newbuff.readUInt8(9)).toBe(153);
        // verify that the original buffer isn't touched by writes
        newbuff.writeUInt8(153, 4);
        expect(newbuff.readUInt8(4)).toBe(153);
        expect(buff.readUInt8(4)).toBe(68);
        // test with no end specified
        const newbuff2 = bintools.copyFrom(buff, 2);
        expect(newbuff2.length).toBe(14);
        expect(newbuff2.readUInt8(0)).toBe(34);
        expect(newbuff2.readUInt8(7)).toBe(153);
    });
    test('bufferToString', () => {
        const bres = bintools.bufferToString(buffer_1.Buffer.from(hexbuffstr1, 'hex'));
        expect(bres).toBe(buffer_1.Buffer.from(hexbuffstr1.slice(4), 'hex').toString('utf8'));
        // testing null character edge case
        const bres2 = bintools.bufferToString(buffer_1.Buffer.from(hexbuffstr2, 'hex'));
        expect(bres2).toBe(buffer_1.Buffer.from(hexbuffstr2.slice(4), 'hex').toString('utf8'));
        // testing null character edge case
        const bres3 = bintools.bufferToString(buffer_1.Buffer.from(hexbuffstr3, 'hex'));
        expect(bres3).toBe(buffer_1.Buffer.from(hexbuffstr3.slice(4), 'hex').toString('utf8'));
    });
    test('stringToBuffer', () => {
        const bres = bintools.stringToBuffer('asdf');
        expect(bres.slice(2).toString()).toBe(buffer_1.Buffer.from(hexbuffstr1.slice(4), 'hex').toString('utf8'));
        // testing null character edge case
        const bres2 = bintools.stringToBuffer('abcdefg');
        expect(bres2.slice(2).toString()).toBe(buffer_1.Buffer.from(hexbuffstr2.slice(4), 'hex').toString('utf8'));
        // testing null character edge case
        const bres3 = bintools.stringToBuffer(buffer_1.Buffer.from(hexbuffstr3.slice(4), 'hex').toString('utf8'));
        expect(bres3.slice(2).toString()).toBe(buffer_1.Buffer.from(hexbuffstr3.slice(4), 'hex').toString('utf8'));
    });
    test('bufferToB58', () => {
        const b58res = bintools.bufferToB58(buff);
        expect(b58res).toBe(b58str);
        // testing null character edge case
        const b58res2 = bintools.bufferToB58(buff2);
        expect(b58res2).toBe(b58str2);
        // testing null character edge case
        const b58res3 = bintools.bufferToB58(buff3);
        expect(b58res3).toBe(b58str3);
    });
    test('b58ToBuffer', () => {
        expect(() => {
            bintools.b58ToBuffer('0OO0O not a valid b58 string 0OO0O');
        }).toThrow('Error - Base58.decode: not a valid base58 string');
        const buffres = bintools.b58ToBuffer(b58str);
        expect(buffres.toString()).toBe(buff.toString());
        // testing zeros character edge case
        const buffres2 = bintools.b58ToBuffer(b58str2);
        expect(buffres2.toString()).toBe(buff2.toString());
        // testing zeros character edge case
        const buffres3 = bintools.b58ToBuffer(b58str3);
        expect(buffres3.toString()).toBe(buff3.toString());
    });
    test('fromBufferToArrayBuffer', () => {
        const arrbuff = bintools.fromBufferToArrayBuffer(buff);
        expect(arrbuff.byteLength).toBe(buff.length);
        for (let i = 0; i < buff.length; i++) {
            expect(arrbuff[i]).toBe(buff[i]);
        }
        // verify that the original buffer isn't touched by writes
        arrbuff[2] = 55;
        expect(buff[2]).not.toBe(55);
    });
    test('fromArrayBufferToBuffer', () => {
        const arrbuff = new ArrayBuffer(10);
        for (let i = 0; i < 10; i++) {
            arrbuff[i] = i;
        }
        const newbuff = bintools.fromArrayBufferToBuffer(arrbuff);
        expect(newbuff.length).toBe(arrbuff.byteLength);
        for (let i = 0; i < newbuff.length; i++) {
            expect(newbuff[i]).toBe(arrbuff[i]);
        }
        // verify that the original buffer isnt touched by writes
        newbuff[3] = 55;
        expect(arrbuff[3]).not.toBe(newbuff[3]);
    });
    test('fromBufferToBN', () => {
        const bign = bintools.fromBufferToBN(buff);
        expect(bign.toString('hex', hexstr.length)).toBe(hexstr);
    });
    test('fromBNToBuffer', () => {
        const bn1 = new bn_js_1.default(hexstr, 'hex', 'be');
        const bn2 = new bn_js_1.default(hexstr, 'hex', 'be');
        const b1 = bintools.fromBNToBuffer(bn1);
        const b2 = bintools.fromBNToBuffer(bn2, buff.length);
        expect(b1.length).toBe(buff.length - 1);
        expect(b1.toString('hex')).toBe(hexstr.slice(2));
        expect(b2.length).toBe(buff.length);
        expect(b2.toString('hex')).toBe(hexstr);
    });
    test('addChecksum', () => {
        const buffchecked = bintools.addChecksum(buff);
        expect(buffchecked.length).toBe(buff.length + 4);
        expect(buffchecked.slice(16).toString('hex')).toBe(checksum);
    });
    test('validteChecksum', () => {
        const checksummed = hexstr + checksum;
        const badsummed = `${hexstr}324e7822`;
        expect(bintools.validateChecksum(buffer_1.Buffer.from(checksummed, 'hex'))).toBe(true);
        expect(bintools.validateChecksum(buff)).toBe(false);
        expect(bintools.validateChecksum(buffer_1.Buffer.from(badsummed, 'hex'))).toBe(false);
    });
    test('cb58Encode', () => {
        const fromBuff = bintools.cb58Encode(buff);
        expect(fromBuff).toBe(serializedChecksum);
    });
    test('cb58Decode', () => {
        const serbuff = bintools.b58ToBuffer(serializedChecksum);
        const dsr1 = bintools.cb58Decode(serializedChecksum);
        const dsr2 = bintools.cb58Decode(serbuff);
        const serbufffaulty = bintools.copyFrom(serbuff);
        serbufffaulty[serbufffaulty.length - 1] = serbufffaulty[serbufffaulty.length - 1] - 1;
        expect(dsr1.toString('hex')).toBe(hexstr);
        expect(dsr2.toString('hex')).toBe(hexstr);
        expect(() => {
            bintools.cb58Decode(serbufffaulty);
        }).toThrow('Error - BinTools.cb58Decode: invalid checksum');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmludG9vbHMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3RzL3V0aWxzL2JpbnRvb2xzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrRUFBMEM7QUFDMUMsa0RBQXVCO0FBQ3ZCLG9DQUFpQztBQUVqQyxNQUFNLFFBQVEsR0FBRyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBRXhDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFO0lBQ3hCLE1BQU0sTUFBTSxHQUFVLGtDQUFrQyxDQUFDO0lBQ3pELE1BQU0sT0FBTyxHQUFVLDBDQUEwQyxDQUFDO0lBQ2xFLE1BQU0sT0FBTyxHQUFVLDBDQUEwQyxDQUFDO0lBQ2xFLE1BQU0sV0FBVyxHQUFVLGNBQWMsQ0FBQyxDQUFDLFNBQVM7SUFDcEQsTUFBTSxXQUFXLEdBQVUsb0JBQW9CLENBQUMsQ0FBQyxZQUFZO0lBQzdELE1BQU0sV0FBVyxHQUFVLG9CQUFvQixDQUFDLENBQUMsdUJBQXVCO0lBQ3hFLE1BQU0sTUFBTSxHQUFVLHVCQUF1QixDQUFDO0lBQzlDLE1BQU0sT0FBTyxHQUFVLDRCQUE0QixDQUFDO0lBQ3BELE1BQU0sT0FBTyxHQUFVLDRCQUE0QixDQUFDO0lBQ3BELE1BQU0sSUFBSSxHQUFVLGVBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQy9DLE1BQU0sS0FBSyxHQUFVLGVBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pELE1BQU0sS0FBSyxHQUFVLGVBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pELE1BQU0sUUFBUSxHQUFVLFVBQVUsQ0FBQztJQUNuQyxNQUFNLGtCQUFrQixHQUFVLDZCQUE2QixDQUFDLENBQUMsK0JBQStCO0lBQ2hHLElBQUksQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7UUFDekMsTUFBTSxJQUFJLEdBQVUsZUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0MsTUFBTSxPQUFPLEdBQVUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLDBEQUEwRDtRQUMxRCxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQyw2QkFBNkI7UUFDN0IsTUFBTSxRQUFRLEdBQVUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQzFCLE1BQU0sSUFBSSxHQUFVLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3RSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM3RSxtQ0FBbUM7UUFDbkMsTUFBTSxLQUFLLEdBQVUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlFLG1DQUFtQztRQUNuQyxNQUFNLEtBQUssR0FBVSxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQzFCLE1BQU0sSUFBSSxHQUFVLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQs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Q0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLCtDQUErQyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCaW5Ub29scyBmcm9tICdzcmMvdXRpbHMvYmludG9vbHMnO1xuaW1wb3J0IEJOIGZyb20gJ2JuLmpzJztcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ2J1ZmZlci8nO1xuXG5jb25zdCBiaW50b29scyA9IEJpblRvb2xzLmdldEluc3RhbmNlKCk7XG5cbmRlc2NyaWJlKCdCaW5Ub29scycsICgpID0+IHtcbiAgY29uc3QgaGV4c3RyOnN0cmluZyA9ICcwMDExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkZWVmZic7XG4gIGNvbnN0IGhleHN0cjI6c3RyaW5nID0gJzAwMDEwMjAzMDQwNTA2MDcwODA5MDkwODA3MDYwNTA0MDMwMjAxMDAnO1xuICBjb25zdCBoZXhzdHIzOnN0cmluZyA9ICcwMDAxMDIwMzA0MDUwNjA3MDgwOTA5MDgwNzA2MDUwNDAzMDIwMTAxJztcbiAgY29uc3QgaGV4YnVmZnN0cjE6c3RyaW5nID0gJzAwMDQ2MTczNjQ2Nic7IC8vID0gYXNkZlxuICBjb25zdCBoZXhidWZmc3RyMjpzdHJpbmcgPSAnMDAwNzYxNjI2MzY0NjU2NjY3JzsgLy8gPSBhYmNkZWZnXG4gIGNvbnN0IGhleGJ1ZmZzdHIzOnN0cmluZyA9ICcwMDA3NmY2YjAwNjY2OTZlNjUnOyAvLyA9IG9rPG51bGw+ZmluZW9rZmluZVxuICBjb25zdCBiNThzdHI6c3RyaW5nID0gJzFVb1d3dzhER2FWR0x0ZWE3elU3cCc7XG4gIGNvbnN0IGI1OHN0cjI6c3RyaW5nID0gJzFCaGgzcFU5Z0xYWmlKdjcza21xWndISjRGJztcbiAgY29uc3QgYjU4c3RyMzpzdHJpbmcgPSAnMUJoaDNwVTlnTFhaaUp2NzNrbXFad0hKNEcnO1xuICBjb25zdCBidWZmOkJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGhleHN0ciwgJ2hleCcpO1xuICBjb25zdCBidWZmMjpCdWZmZXIgPSBCdWZmZXIuZnJvbShoZXhzdHIyLCAnaGV4Jyk7XG4gIGNvbnN0IGJ1ZmYzOkJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGhleHN0cjMsICdoZXgnKTtcbiAgY29uc3QgY2hlY2tzdW06c3RyaW5nID0gJzMyM2U2ODExJztcbiAgY29uc3Qgc2VyaWFsaXplZENoZWNrc3VtOnN0cmluZyA9ICcxNDh2anB1eFlYaXhiOERjYmFXeWVERTJmRUcnOyAvLyBzZXJpYWxpemVkIGhleHN0ciArIGNoZWNrc3VtXG4gIHRlc3QoJ2NvcHlGcm9tIGNvbmR1Y3RzIGEgdHJ1ZSBjb3B5JywgKCkgPT4ge1xuICAgIGNvbnN0IGJ1ZmY6QnVmZmVyID0gQnVmZmVyLmZyb20oaGV4c3RyLCAnaGV4Jyk7XG4gICAgY29uc3QgbmV3YnVmZjpCdWZmZXIgPSBiaW50b29scy5jb3B5RnJvbShidWZmLCAwLCAxMCk7XG4gICAgZXhwZWN0KG5ld2J1ZmYubGVuZ3RoKS50b0JlKDEwKTtcbiAgICBleHBlY3QobmV3YnVmZi5yZWFkVUludDgoMCkpLnRvQmUoMCk7XG4gICAgZXhwZWN0KG5ld2J1ZmYucmVhZFVJbnQ4KDkpKS50b0JlKDE1Myk7XG4gICAgLy8gdmVyaWZ5IHRoYXQgdGhlIG9yaWdpbmFsIGJ1ZmZlciBpc24ndCB0b3VjaGVkIGJ5IHdyaXRlc1xuICAgIG5ld2J1ZmYud3JpdGVVSW50OCgxNTMsIDQpO1xuICAgIGV4cGVjdChuZXdidWZmLnJlYWRVSW50OCg0KSkudG9CZSgxNTMpO1xuICAgIGV4cGVjdChidWZmLnJlYWRVSW50OCg0KSkudG9CZSg2OCk7XG4gICAgLy8gdGVzdCB3aXRoIG5vIGVuZCBzcGVjaWZpZWRcbiAgICBjb25zdCBuZXdidWZmMjpCdWZmZXIgPSBiaW50b29scy5jb3B5RnJvbShidWZmLCAyKTtcbiAgICBleHBlY3QobmV3YnVmZjIubGVuZ3RoKS50b0JlKDE0KTtcbiAgICBleHBlY3QobmV3YnVmZjIucmVhZFVJbnQ4KDApKS50b0JlKDM0KTtcbiAgICBleHBlY3QobmV3YnVmZjIucmVhZFVJbnQ4KDcpKS50b0JlKDE1Myk7XG4gIH0pO1xuXG4gIHRlc3QoJ2J1ZmZlclRvU3RyaW5nJywgKCkgPT4ge1xuICAgIGNvbnN0IGJyZXM6c3RyaW5nID0gYmludG9vbHMuYnVmZmVyVG9TdHJpbmcoQnVmZmVyLmZyb20oaGV4YnVmZnN0cjEsICdoZXgnKSk7XG4gICAgZXhwZWN0KGJyZXMpLnRvQmUoQnVmZmVyLmZyb20oaGV4YnVmZnN0cjEuc2xpY2UoNCksICdoZXgnKS50b1N0cmluZygndXRmOCcpKTtcbiAgICAvLyB0ZXN0aW5nIG51bGwgY2hhcmFjdGVyIGVkZ2UgY2FzZVxuICAgIGNvbnN0IGJyZXMyOnN0cmluZyA9IGJpbnRvb2xzLmJ1ZmZlclRvU3RyaW5nKEJ1ZmZlci5mcm9tKGhleGJ1ZmZzdHIyLCAnaGV4JykpO1xuICAgIGV4cGVjdChicmVzMikudG9CZShCdWZmZXIuZnJvbShoZXhidWZmc3RyMi5zbGljZSg0KSwgJ2hleCcpLnRvU3RyaW5nKCd1dGY4JykpO1xuICAgIC8vIHRlc3RpbmcgbnVsbCBjaGFyYWN0ZXIgZWRnZSBjYXNlXG4gICAgY29uc3QgYnJlczM6c3RyaW5nID0gYmludG9vbHMuYnVmZmVyVG9TdHJpbmcoQnVmZmVyLmZyb20oaGV4YnVmZnN0cjMsICdoZXgnKSk7XG4gICAgZXhwZWN0KGJyZXMzKS50b0JlKEJ1ZmZlci5mcm9tKGhleGJ1ZmZzdHIzLnNsaWNlKDQpLCAnaGV4JykudG9TdHJpbmcoJ3V0ZjgnKSk7XG4gIH0pO1xuXG4gIHRlc3QoJ3N0cmluZ1RvQnVmZmVyJywgKCkgPT4ge1xuICAgIGNvbnN0IGJyZXM6QnVmZmVyID0gYmludG9vbHMuc3RyaW5nVG9CdWZmZXIoJ2FzZGYnKTtcbiAgICBleHBlY3QoYnJlcy5zbGljZSgyKS50b1N0cmluZygpKS50b0JlKEJ1ZmZlci5mcm9tKGhleGJ1ZmZzdHIxLnNsaWNlKDQpLCAnaGV4JykudG9TdHJpbmcoJ3V0ZjgnKSk7XG4gICAgLy8gdGVzdGluZyBudWxsIGNoYXJhY3RlciBlZGdlIGNhc2VcbiAgICBjb25zdCBicmVzMjpCdWZmZXIgPSBiaW50b29scy5zdHJpbmdUb0J1ZmZlcignYWJjZGVmZycpO1xuICAgIGV4cGVjdChicmVzMi5zbGljZSgyKS50b1N0cmluZygpKS50b0JlKEJ1ZmZlci5mcm9tKGhleGJ1ZmZzdHIyLnNsaWNlKDQpLCAnaGV4JykudG9TdHJpbmcoJ3V0ZjgnKSk7XG4gICAgLy8gdGVzdGluZyBudWxsIGNoYXJhY3RlciBlZGdlIGNhc2VcbiAgICBjb25zdCBicmVzMzpCdWZmZXIgPSBiaW50b29scy5zdHJpbmdUb0J1ZmZlcihCdWZmZXIuZnJvbShoZXhidWZmc3RyMy5zbGljZSg0KSwgJ2hleCcpLnRvU3RyaW5nKCd1dGY4JykpO1xuICAgIGV4cGVjdChicmVzMy5zbGljZSgyKS50b1N0cmluZygpKS50b0JlKEJ1ZmZlci5mcm9tKGhleGJ1ZmZzdHIzLnNsaWNlKDQpLCAnaGV4JykudG9TdHJpbmcoJ3V0ZjgnKSk7XG4gIH0pO1xuXG4gIHRlc3QoJ2J1ZmZlclRvQjU4JywgKCkgPT4ge1xuICAgIGNvbnN0IGI1OHJlczpzdHJpbmcgPSBiaW50b29scy5idWZmZXJUb0I1OChidWZmKTtcbiAgICBleHBlY3QoYjU4cmVzKS50b0JlKGI1OHN0cik7XG4gICAgLy8gdGVzdGluZyBudWxsIGNoYXJhY3RlciBlZGdlIGNhc2VcbiAgICBjb25zdCBiNThyZXMyOnN0cmluZyA9IGJpbnRvb2xzLmJ1ZmZlclRvQjU4KGJ1ZmYyKTtcbiAgICBleHBlY3QoYjU4cmVzMikudG9CZShiNThzdHIyKTtcbiAgICAvLyB0ZXN0aW5nIG51bGwgY2hhcmFjdGVyIGVkZ2UgY2FzZVxuICAgIGNvbnN0IGI1OHJlczM6c3RyaW5nID0gYmludG9vbHMuYnVmZmVyVG9CNTgoYnVmZjMpO1xuICAgIGV4cGVjdChiNThyZXMzKS50b0JlKGI1OHN0cjMpO1xuICB9KTtcblxuICB0ZXN0KCdiNThUb0J1ZmZlcicsICgpID0+IHtcbiAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgYmludG9vbHMuYjU4VG9CdWZmZXIoJzBPTzBPIG5vdCBhIHZhbGlkIGI1OCBzdHJpbmcgME9PME8nKTtcbiAgICB9KS50b1Rocm93KCdFcnJvciAtIEJhc2U1OC5kZWNvZGU6IG5vdCBhIHZhbGlkIGJhc2U1OCBzdHJpbmcnKTtcblxuICAgIGNvbnN0IGJ1ZmZyZXM6QnVmZmVyID0gYmludG9vbHMuYjU4VG9CdWZmZXIoYjU4c3RyKTtcbiAgICBleHBlY3QoYnVmZnJlcy50b1N0cmluZygpKS50b0JlKGJ1ZmYudG9TdHJpbmcoKSk7XG4gICAgLy8gdGVzdGluZyB6ZXJvcyBjaGFyYWN0ZXIgZWRnZSBjYXNlXG4gICAgY29uc3QgYnVmZnJlczI6QnVmZmVyID0gYmludG9vbHMuYjU4VG9CdWZmZXIoYjU4c3RyMik7XG4gICAgZXhwZWN0KGJ1ZmZyZXMyLnRvU3RyaW5nKCkpLnRvQmUoYnVmZjIudG9TdHJpbmcoKSk7XG4gICAgLy8gdGVzdGluZyB6ZXJvcyBjaGFyYWN0ZXIgZWRnZSBjYXNlXG4gICAgY29uc3QgYnVmZnJlczM6QnVmZmVyID0gYmludG9vbHMuYjU4VG9CdWZmZXIoYjU4c3RyMyk7XG4gICAgZXhwZWN0KGJ1ZmZyZXMzLnRvU3RyaW5nKCkpLnRvQmUoYnVmZjMudG9TdHJpbmcoKSk7XG4gIH0pO1xuXG4gIHRlc3QoJ2Zyb21CdWZmZXJUb0FycmF5QnVmZmVyJywgKCkgPT4ge1xuICAgIGNvbnN0IGFycmJ1ZmY6QXJyYXlCdWZmZXIgPSBiaW50b29scy5mcm9tQnVmZmVyVG9BcnJheUJ1ZmZlcihidWZmKTtcbiAgICBleHBlY3QoYXJyYnVmZi5ieXRlTGVuZ3RoKS50b0JlKGJ1ZmYubGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpOm51bWJlciA9IDA7IGkgPCBidWZmLmxlbmd0aDsgaSsrKSB7XG4gICAgICBleHBlY3QoYXJyYnVmZltpXSkudG9CZShidWZmW2ldKTtcbiAgICB9XG4gICAgLy8gdmVyaWZ5IHRoYXQgdGhlIG9yaWdpbmFsIGJ1ZmZlciBpc24ndCB0b3VjaGVkIGJ5IHdyaXRlc1xuICAgIGFycmJ1ZmZbMl0gPSA1NTtcbiAgICBleHBlY3QoYnVmZlsyXSkubm90LnRvQmUoNTUpO1xuICB9KTtcblxuICB0ZXN0KCdmcm9tQXJyYXlCdWZmZXJUb0J1ZmZlcicsICgpID0+IHtcbiAgICBjb25zdCBhcnJidWZmOkFycmF5QnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKDEwKTtcbiAgICBmb3IgKGxldCBpOm51bWJlciA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBhcnJidWZmW2ldID0gaTtcbiAgICB9XG4gICAgY29uc3QgbmV3YnVmZjpCdWZmZXIgPSBiaW50b29scy5mcm9tQXJyYXlCdWZmZXJUb0J1ZmZlcihhcnJidWZmKTtcbiAgICBleHBlY3QobmV3YnVmZi5sZW5ndGgpLnRvQmUoYXJyYnVmZi5ieXRlTGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpOm51bWJlciA9IDA7IGkgPCBuZXdidWZmLmxlbmd0aDsgaSsrKSB7XG4gICAgICBleHBlY3QobmV3YnVmZltpXSkudG9CZShhcnJidWZmW2ldKTtcbiAgICB9XG4gICAgLy8gdmVyaWZ5IHRoYXQgdGhlIG9yaWdpbmFsIGJ1ZmZlciBpc250IHRvdWNoZWQgYnkgd3JpdGVzXG4gICAgbmV3YnVmZlszXSA9IDU1O1xuICAgIGV4cGVjdChhcnJidWZmWzNdKS5ub3QudG9CZShuZXdidWZmWzNdKTtcbiAgfSk7XG5cbiAgdGVzdCgnZnJvbUJ1ZmZlclRvQk4nLCAoKSA9PiB7XG4gICAgY29uc3QgYmlnbjpCTiA9IGJpbnRvb2xzLmZyb21CdWZmZXJUb0JOKGJ1ZmYpO1xuICAgIGV4cGVjdChiaWduLnRvU3RyaW5nKCdoZXgnLCBoZXhzdHIubGVuZ3RoKSkudG9CZShoZXhzdHIpO1xuICB9KTtcblxuICB0ZXN0KCdmcm9tQk5Ub0J1ZmZlcicsICgpID0+IHtcbiAgICBjb25zdCBibjE6Qk4gPSBuZXcgQk4oaGV4c3RyLCAnaGV4JywgJ2JlJyk7XG4gICAgY29uc3QgYm4yOkJOID0gbmV3IEJOKGhleHN0ciwgJ2hleCcsICdiZScpO1xuICAgIGNvbnN0IGIxOkJ1ZmZlciA9IGJpbnRvb2xzLmZyb21CTlRvQnVmZmVyKGJuMSk7XG4gICAgY29uc3QgYjI6QnVmZmVyID0gYmludG9vbHMuZnJvbUJOVG9CdWZmZXIoYm4yLCBidWZmLmxlbmd0aCk7XG5cbiAgICBleHBlY3QoYjEubGVuZ3RoKS50b0JlKGJ1ZmYubGVuZ3RoIC0gMSk7XG4gICAgZXhwZWN0KGIxLnRvU3RyaW5nKCdoZXgnKSkudG9CZShoZXhzdHIuc2xpY2UoMikpO1xuXG4gICAgZXhwZWN0KGIyLmxlbmd0aCkudG9CZShidWZmLmxlbmd0aCk7XG4gICAgZXhwZWN0KGIyLnRvU3RyaW5nKCdoZXgnKSkudG9CZShoZXhzdHIpO1xuICB9KTtcblxuICB0ZXN0KCdhZGRDaGVja3N1bScsICgpID0+IHtcbiAgICBjb25zdCBidWZmY2hlY2tlZDpCdWZmZXIgPSBiaW50b29scy5hZGRDaGVja3N1bShidWZmKTtcbiAgICBleHBlY3QoYnVmZmNoZWNrZWQubGVuZ3RoKS50b0JlKGJ1ZmYubGVuZ3RoICsgNCk7XG4gICAgZXhwZWN0KGJ1ZmZjaGVja2VkLnNsaWNlKDE2KS50b1N0cmluZygnaGV4JykpLnRvQmUoY2hlY2tzdW0pO1xuICB9KTtcblxuICB0ZXN0KCd2YWxpZHRlQ2hlY2tzdW0nLCAoKSA9PiB7XG4gICAgY29uc3QgY2hlY2tzdW1tZWQ6c3RyaW5nID0gaGV4c3RyICsgY2hlY2tzdW07XG4gICAgY29uc3QgYmFkc3VtbWVkOnN0cmluZyA9IGAke2hleHN0cn0zMjRlNzgyMmA7XG4gICAgZXhwZWN0KGJpbnRvb2xzLnZhbGlkYXRlQ2hlY2tzdW0oQnVmZmVyLmZyb20oY2hlY2tzdW1tZWQsICdoZXgnKSkpLnRvQmUodHJ1ZSk7XG4gICAgZXhwZWN0KGJpbnRvb2xzLnZhbGlkYXRlQ2hlY2tzdW0oYnVmZikpLnRvQmUoZmFsc2UpO1xuICAgIGV4cGVjdChiaW50b29scy52YWxpZGF0ZUNoZWNrc3VtKEJ1ZmZlci5mcm9tKGJhZHN1bW1lZCwgJ2hleCcpKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIHRlc3QoJ2NiNThFbmNvZGUnLCAoKSA9PiB7XG4gICAgY29uc3QgZnJvbUJ1ZmY6c3RyaW5nID0gYmludG9vbHMuY2I1OEVuY29kZShidWZmKTtcbiAgICBleHBlY3QoZnJvbUJ1ZmYpLnRvQmUoc2VyaWFsaXplZENoZWNrc3VtKTtcbiAgfSk7XG5cbiAgdGVzdCgnY2I1OERlY29kZScsICgpID0+IHtcbiAgICBjb25zdCBzZXJidWZmOkJ1ZmZlciA9IGJpbnRvb2xzLmI1OFRvQnVmZmVyKHNlcmlhbGl6ZWRDaGVja3N1bSk7XG4gICAgY29uc3QgZHNyMTpCdWZmZXIgPSBiaW50b29scy5jYjU4RGVjb2RlKHNlcmlhbGl6ZWRDaGVja3N1bSk7XG4gICAgY29uc3QgZHNyMjpCdWZmZXIgPSBiaW50b29scy5jYjU4RGVjb2RlKHNlcmJ1ZmYpO1xuICAgIGNvbnN0IHNlcmJ1ZmZmYXVsdHk6QnVmZmVyID0gYmludG9vbHMuY29weUZyb20oc2VyYnVmZik7XG4gICAgc2VyYnVmZmZhdWx0eVtzZXJidWZmZmF1bHR5Lmxlbmd0aCAtIDFdID0gc2VyYnVmZmZhdWx0eVtzZXJidWZmZmF1bHR5Lmxlbmd0aCAtIDFdIC0gMTtcbiAgICBleHBlY3QoZHNyMS50b1N0cmluZygnaGV4JykpLnRvQmUoaGV4c3RyKTtcbiAgICBleHBlY3QoZHNyMi50b1N0cmluZygnaGV4JykpLnRvQmUoaGV4c3RyKTtcbiAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgYmludG9vbHMuY2I1OERlY29kZShzZXJidWZmZmF1bHR5KTtcbiAgICB9KS50b1Rocm93KCdFcnJvciAtIEJpblRvb2xzLmNiNThEZWNvZGU6IGludmFsaWQgY2hlY2tzdW0nKTtcbiAgfSk7XG59KTtcbiJdfQ==