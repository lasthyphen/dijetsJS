"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evm_1 = require("src/apis/evm");
describe('Inputs', () => {
    test('EVMOutput comparator', () => {
        let outs = [];
        const address1 = "0x55ee05dF718f1a5C1441e76190EB1a19eE2C9430";
        const address3 = "0x9632a79656af553F58738B0FB750320158495942";
        const address4 = "0x4Cf2eD3665F6bFA95cE6A11CFDb7A2EF5FC1C7E4";
        const address6 = "0x3C7daE394BBf8e9EE1359ad14C1C47003bD06293";
        const address8 = "0x0Fa8EA536Be85F32724D57A37758761B86416123";
        const amount1 = 1;
        const amount2 = 2;
        const amount3 = 3;
        const amount4 = 4;
        const amount5 = 5;
        const amount6 = 6;
        const amount7 = 7;
        const amount8 = 8;
        const assetID1 = "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe"; // dbcf890f77f49b96857648b72b77f9f82937f28a68704af05da0dc12ba53f2db
        const assetID2 = "vvKCjrpggyQ8FhJ2D5EAKPh8x8y4JK93JQiWRpTKpEouydRbG"; // 7a6e1e3c9c66ed8f076180f89d01320795628dca633001ff437ac6ab58b455be
        const assetID3 = "eRo1eb2Yxd87KuMYANBSha3n138wtqRhFz2xjftsXWnmpCxyh"; // 54fbd087a8a9c739c2c7926d742ea7b937adbd512b9ff0fd51f460a763d1371a
        const assetID5 = "2QqUTT3XTgR6HLbCLGtjN2uDHHqNRaBgtBGJ5KCqW7BUaH1P8X"; // b9d16d7c7d2674c3c67c5c26d9d6e39a09a5991c588cdf60c4cca732b66fa749
        const assetID6 = "ZWXaLcAy1YWS3Vvjcrt2KcVA4VxBsMFt8yNDZABJkgBvgpRti"; // 49d0dc67846a20dfea79b7beeba84769efa4a0273575f65ca79f9dee1cd1250e
        const assetID7 = "FHfS61NfF5XdZU62bcXp9yRfgrZeiQC7VNJWKcpdb9QMLHs4L"; // 2070e77e34941439dc7bcf502dcf555c6ef0e3cc46bbac8a03b22e15c84a81f1
        const assetID8 = "ZL6NeWgcnxR2zhhKDx7h9Kg2mZgScC5N4RG5FCDayWY7W3whZ"; // 496849239bb1541e97fa8f89256965bf7e657f3bb530cad820dd41706c5e3836
        const output1 = new evm_1.EVMOutput(address1, amount1, assetID1);
        outs.push(output1);
        const output2 = new evm_1.EVMOutput(address1, amount2, assetID2);
        outs.push(output2);
        const output3 = new evm_1.EVMOutput(address3, amount3, assetID2);
        outs.push(output3);
        const output4 = new evm_1.EVMOutput(address4, amount4, assetID3);
        outs.push(output4);
        const output5 = new evm_1.EVMOutput(address1, amount5, assetID5);
        outs.push(output5);
        const output6 = new evm_1.EVMOutput(address6, amount6, assetID6);
        outs.push(output6);
        const output7 = new evm_1.EVMOutput(address1, amount7, assetID7);
        outs.push(output7);
        const output8 = new evm_1.EVMOutput(address8, amount8, assetID8);
        outs.push(output8);
        outs = outs.sort(evm_1.EVMOutput.comparator());
        expect(outs[0].getAmount().toString()).toBe("8");
        expect(outs[1].getAmount().toString()).toBe("6");
        expect(outs[2].getAmount().toString()).toBe("4");
        expect(outs[3].getAmount().toString()).toBe("7");
        expect(outs[4].getAmount().toString()).toBe("2");
        expect(outs[5].getAmount().toString()).toBe("5");
        expect(outs[6].getAmount().toString()).toBe("1");
        expect(outs[7].getAmount().toString()).toBe("3");
        const cmp = evm_1.EVMOutput.comparator();
        expect(cmp(output2, output1)).toBe(-1);
        expect(cmp(output1, output3)).toBe(-1);
        expect(cmp(output2, output3)).toBe(-1);
        expect(cmp(output1, output1)).toBe(0);
        expect(cmp(output2, output2)).toBe(0);
        expect(cmp(output3, output3)).toBe(0);
        expect(cmp(output1, output2)).toBe(1);
        expect(cmp(output3, output1)).toBe(1);
        expect(cmp(output3, output2)).toBe(1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0cy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vdGVzdHMvYXBpcy9ldm0vb3V0cHV0cy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlDO0FBRXpDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO0lBQ3RCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7UUFDaEMsSUFBSSxJQUFJLEdBQWdCLEVBQUUsQ0FBQztRQUMzQixNQUFNLFFBQVEsR0FBVyw0Q0FBNEMsQ0FBQztRQUN0RSxNQUFNLFFBQVEsR0FBVyw0Q0FBNEMsQ0FBQztRQUN0RSxNQUFNLFFBQVEsR0FBVyw0Q0FBNEMsQ0FBQztRQUN0RSxNQUFNLFFBQVEsR0FBVyw0Q0FBNEMsQ0FBQztRQUN0RSxNQUFNLFFBQVEsR0FBVyw0Q0FBNEMsQ0FBQztRQUN0RSxNQUFNLE9BQU8sR0FBVyxDQUFDLENBQUM7UUFDMUIsTUFBTSxPQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sT0FBTyxHQUFXLENBQUMsQ0FBQztRQUMxQixNQUFNLE9BQU8sR0FBVyxDQUFDLENBQUM7UUFDMUIsTUFBTSxPQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sT0FBTyxHQUFXLENBQUMsQ0FBQztRQUMxQixNQUFNLE9BQU8sR0FBVyxDQUFDLENBQUM7UUFDMUIsTUFBTSxPQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLE1BQU0sUUFBUSxHQUFXLG9EQUFvRCxDQUFDLENBQUMsbUVBQW1FO1FBQ2xKLE1BQU0sUUFBUSxHQUFXLG1EQUFtRCxDQUFDLENBQUMsbUVBQW1FO1FBQ2pKLE1BQU0sUUFBUSxHQUFXLG1EQUFtRCxDQUFDLENBQUMsbUVBQW1FO1FBQ2pKLE1BQU0sUUFBUSxHQUFXLG9EQUFvRCxDQUFDLENBQUMsbUVBQW1FO1FBQ2xKLE1BQU0sUUFBUSxHQUFXLG1EQUFtRCxDQUFDLENBQUMsbUVBQW1FO1FBQ2pKLE1BQU0sUUFBUSxHQUFXLG1EQUFtRCxDQUFDLENBQUMsbUVBQW1FO1FBQ2pKLE1BQU0sUUFBUSxHQUFXLG1EQUFtRCxDQUFDLENBQUMsbUVBQW1FO1FBRWpKLE1BQU0sT0FBTyxHQUFjLElBQUksZUFBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQixNQUFNLE9BQU8sR0FBYyxJQUFJLGVBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsTUFBTSxPQUFPLEdBQWMsSUFBSSxlQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25CLE1BQU0sT0FBTyxHQUFjLElBQUksZUFBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQixNQUFNLE9BQU8sR0FBYyxJQUFJLGVBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsTUFBTSxPQUFPLEdBQWMsSUFBSSxlQUFTLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25CLE1BQU0sT0FBTyxHQUFjLElBQUksZUFBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQixNQUFNLE9BQU8sR0FBYyxJQUFJLGVBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUE7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpELE1BQU0sR0FBRyxHQUFHLGVBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNuQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRVZNT3V0cHV0IH0gZnJvbSAnc3JjL2FwaXMvZXZtJztcblxuZGVzY3JpYmUoJ0lucHV0cycsICgpID0+IHtcbiAgdGVzdCgnRVZNT3V0cHV0IGNvbXBhcmF0b3InLCAoKSA9PiB7XG4gICAgbGV0IG91dHM6IEVWTU91dHB1dFtdID0gW107XG4gICAgY29uc3QgYWRkcmVzczE6IHN0cmluZyA9IFwiMHg1NWVlMDVkRjcxOGYxYTVDMTQ0MWU3NjE5MEVCMWExOWVFMkM5NDMwXCI7XG4gICAgY29uc3QgYWRkcmVzczM6IHN0cmluZyA9IFwiMHg5NjMyYTc5NjU2YWY1NTNGNTg3MzhCMEZCNzUwMzIwMTU4NDk1OTQyXCI7XG4gICAgY29uc3QgYWRkcmVzczQ6IHN0cmluZyA9IFwiMHg0Q2YyZUQzNjY1RjZiRkE5NWNFNkExMUNGRGI3QTJFRjVGQzFDN0U0XCI7XG4gICAgY29uc3QgYWRkcmVzczY6IHN0cmluZyA9IFwiMHgzQzdkYUUzOTRCQmY4ZTlFRTEzNTlhZDE0QzFDNDcwMDNiRDA2MjkzXCI7XG4gICAgY29uc3QgYWRkcmVzczg6IHN0cmluZyA9IFwiMHgwRmE4RUE1MzZCZTg1RjMyNzI0RDU3QTM3NzU4NzYxQjg2NDE2MTIzXCI7XG4gICAgY29uc3QgYW1vdW50MTogbnVtYmVyID0gMTtcbiAgICBjb25zdCBhbW91bnQyOiBudW1iZXIgPSAyO1xuICAgIGNvbnN0IGFtb3VudDM6IG51bWJlciA9IDM7XG4gICAgY29uc3QgYW1vdW50NDogbnVtYmVyID0gNDtcbiAgICBjb25zdCBhbW91bnQ1OiBudW1iZXIgPSA1O1xuICAgIGNvbnN0IGFtb3VudDY6IG51bWJlciA9IDY7XG4gICAgY29uc3QgYW1vdW50NzogbnVtYmVyID0gNztcbiAgICBjb25zdCBhbW91bnQ4OiBudW1iZXIgPSA4O1xuICAgIGNvbnN0IGFzc2V0SUQxOiBzdHJpbmcgPSBcIjJmb21iaEw3YUdQd2ozS0g0YmZybUp3VzZQVm5Nb2JmOVkyZm45R3d4aUFBSnlGRGJlXCI7IC8vIGRiY2Y4OTBmNzdmNDliOTY4NTc2NDhiNzJiNzdmOWY4MjkzN2YyOGE2ODcwNGFmMDVkYTBkYzEyYmE1M2YyZGJcbiAgICBjb25zdCBhc3NldElEMjogc3RyaW5nID0gXCJ2dktDanJwZ2d5UThGaEoyRDVFQUtQaDh4OHk0Sks5M0pRaVdScFRLcEVvdXlkUmJHXCI7IC8vIDdhNmUxZTNjOWM2NmVkOGYwNzYxODBmODlkMDEzMjA3OTU2MjhkY2E2MzMwMDFmZjQzN2FjNmFiNThiNDU1YmVcbiAgICBjb25zdCBhc3NldElEMzogc3RyaW5nID0gXCJlUm8xZWIyWXhkODdLdU1ZQU5CU2hhM24xMzh3dHFSaEZ6MnhqZnRzWFdubXBDeHloXCI7IC8vIDU0ZmJkMDg3YThhOWM3MzljMmM3OTI2ZDc0MmVhN2I5MzdhZGJkNTEyYjlmZjBmZDUxZjQ2MGE3NjNkMTM3MWFcbiAgICBjb25zdCBhc3NldElENTogc3RyaW5nID0gXCIyUXFVVFQzWFRnUjZITGJDTEd0ak4ydURISHFOUmFCZ3RCR0o1S0NxVzdCVWFIMVA4WFwiOyAvLyBiOWQxNmQ3YzdkMjY3NGMzYzY3YzVjMjZkOWQ2ZTM5YTA5YTU5OTFjNTg4Y2RmNjBjNGNjYTczMmI2NmZhNzQ5XG4gICAgY29uc3QgYXNzZXRJRDY6IHN0cmluZyA9IFwiWldYYUxjQXkxWVdTM1Z2amNydDJLY1ZBNFZ4QnNNRnQ4eU5EWkFCSmtnQnZncFJ0aVwiOyAvLyA0OWQwZGM2Nzg0NmEyMGRmZWE3OWI3YmVlYmE4NDc2OWVmYTRhMDI3MzU3NWY2NWNhNzlmOWRlZTFjZDEyNTBlXG4gICAgY29uc3QgYXNzZXRJRDc6IHN0cmluZyA9IFwiRkhmUzYxTmZGNVhkWlU2MmJjWHA5eVJmZ3JaZWlRQzdWTkpXS2NwZGI5UU1MSHM0TFwiOyAvLyAyMDcwZTc3ZTM0OTQxNDM5ZGM3YmNmNTAyZGNmNTU1YzZlZjBlM2NjNDZiYmFjOGEwM2IyMmUxNWM4NGE4MWYxXG4gICAgY29uc3QgYXNzZXRJRDg6IHN0cmluZyA9IFwiWkw2TmVXZ2NueFIyemhoS0R4N2g5S2cybVpnU2NDNU40Ukc1RkNEYXlXWTdXM3doWlwiOyAvLyA0OTY4NDkyMzliYjE1NDFlOTdmYThmODkyNTY5NjViZjdlNjU3ZjNiYjUzMGNhZDgyMGRkNDE3MDZjNWUzODM2XG5cbiAgICBjb25zdCBvdXRwdXQxOiBFVk1PdXRwdXQgPSBuZXcgRVZNT3V0cHV0KGFkZHJlc3MxLCBhbW91bnQxLCBhc3NldElEMSk7XG4gICAgb3V0cy5wdXNoKG91dHB1dDEpO1xuICAgIGNvbnN0IG91dHB1dDI6IEVWTU91dHB1dCA9IG5ldyBFVk1PdXRwdXQoYWRkcmVzczEsIGFtb3VudDIsIGFzc2V0SUQyKTtcbiAgICBvdXRzLnB1c2gob3V0cHV0Mik7XG4gICAgY29uc3Qgb3V0cHV0MzogRVZNT3V0cHV0ID0gbmV3IEVWTU91dHB1dChhZGRyZXNzMywgYW1vdW50MywgYXNzZXRJRDIpO1xuICAgIG91dHMucHVzaChvdXRwdXQzKTtcbiAgICBjb25zdCBvdXRwdXQ0OiBFVk1PdXRwdXQgPSBuZXcgRVZNT3V0cHV0KGFkZHJlc3M0LCBhbW91bnQ0LCBhc3NldElEMyk7XG4gICAgb3V0cy5wdXNoKG91dHB1dDQpO1xuICAgIGNvbnN0IG91dHB1dDU6IEVWTU91dHB1dCA9IG5ldyBFVk1PdXRwdXQoYWRkcmVzczEsIGFtb3VudDUsIGFzc2V0SUQ1KTtcbiAgICBvdXRzLnB1c2gob3V0cHV0NSk7XG4gICAgY29uc3Qgb3V0cHV0NjogRVZNT3V0cHV0ID0gbmV3IEVWTU91dHB1dChhZGRyZXNzNiwgYW1vdW50NiwgYXNzZXRJRDYpO1xuICAgIG91dHMucHVzaChvdXRwdXQ2KTtcbiAgICBjb25zdCBvdXRwdXQ3OiBFVk1PdXRwdXQgPSBuZXcgRVZNT3V0cHV0KGFkZHJlc3MxLCBhbW91bnQ3LCBhc3NldElENyk7XG4gICAgb3V0cy5wdXNoKG91dHB1dDcpO1xuICAgIGNvbnN0IG91dHB1dDg6IEVWTU91dHB1dCA9IG5ldyBFVk1PdXRwdXQoYWRkcmVzczgsIGFtb3VudDgsIGFzc2V0SUQ4KTtcbiAgICBvdXRzLnB1c2gob3V0cHV0OCk7XG4gICAgb3V0cyA9IG91dHMuc29ydChFVk1PdXRwdXQuY29tcGFyYXRvcigpKVxuICAgIGV4cGVjdChvdXRzWzBdLmdldEFtb3VudCgpLnRvU3RyaW5nKCkpLnRvQmUoXCI4XCIpO1xuICAgIGV4cGVjdChvdXRzWzFdLmdldEFtb3VudCgpLnRvU3RyaW5nKCkpLnRvQmUoXCI2XCIpO1xuICAgIGV4cGVjdChvdXRzWzJdLmdldEFtb3VudCgpLnRvU3RyaW5nKCkpLnRvQmUoXCI0XCIpO1xuICAgIGV4cGVjdChvdXRzWzNdLmdldEFtb3VudCgpLnRvU3RyaW5nKCkpLnRvQmUoXCI3XCIpO1xuICAgIGV4cGVjdChvdXRzWzRdLmdldEFtb3VudCgpLnRvU3RyaW5nKCkpLnRvQmUoXCIyXCIpO1xuICAgIGV4cGVjdChvdXRzWzVdLmdldEFtb3VudCgpLnRvU3RyaW5nKCkpLnRvQmUoXCI1XCIpO1xuICAgIGV4cGVjdChvdXRzWzZdLmdldEFtb3VudCgpLnRvU3RyaW5nKCkpLnRvQmUoXCIxXCIpO1xuICAgIGV4cGVjdChvdXRzWzddLmdldEFtb3VudCgpLnRvU3RyaW5nKCkpLnRvQmUoXCIzXCIpO1xuXG4gICAgY29uc3QgY21wID0gRVZNT3V0cHV0LmNvbXBhcmF0b3IoKTtcbiAgICBleHBlY3QoY21wKG91dHB1dDIsIG91dHB1dDEpKS50b0JlKC0xKTtcbiAgICBleHBlY3QoY21wKG91dHB1dDEsIG91dHB1dDMpKS50b0JlKC0xKTtcbiAgICBleHBlY3QoY21wKG91dHB1dDIsIG91dHB1dDMpKS50b0JlKC0xKTtcbiAgICBleHBlY3QoY21wKG91dHB1dDEsIG91dHB1dDEpKS50b0JlKDApO1xuICAgIGV4cGVjdChjbXAob3V0cHV0Miwgb3V0cHV0MikpLnRvQmUoMCk7XG4gICAgZXhwZWN0KGNtcChvdXRwdXQzLCBvdXRwdXQzKSkudG9CZSgwKTtcbiAgICBleHBlY3QoY21wKG91dHB1dDEsIG91dHB1dDIpKS50b0JlKDEpO1xuICAgIGV4cGVjdChjbXAob3V0cHV0Mywgb3V0cHV0MSkpLnRvQmUoMSk7XG4gICAgZXhwZWN0KGNtcChvdXRwdXQzLCBvdXRwdXQyKSkudG9CZSgxKTtcbiAgfSk7XG59KTtcbiJdfQ==